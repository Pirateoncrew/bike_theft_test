import React, { useState } from "react"
import Pagination from "../components/pagination"
import { data } from './data'
import Input from "../components/input";


class HomePage extends React.Component {
    state = {
        dataOnview: [],
        originData: [],
        minData: null,
        from: null,
        to: null,
        totalInfo: '',
        fromSearch: null,
        fromDate: false
    }
    constructor(props) {
        super(props)

        this.handlePages = this.pagination.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
    }

    componentDidMount() {
        this.pagination()
    }


    async pagination() {
        const origiData = data.sort((a, b) => {
            return a.occurred_at - b.occurred_at
        })
        await this.setState({
            dataOnview: origiData,
            originData: origiData,
            totalInfo: origiData.length + '\tBike has been reported from\t' + new Date(origiData[0].updated_at * 1000).toGMTString().replace('GMT', '') + '\tTo\t' + new Date(origiData[origiData.length - 1].updated_at * 1000).toGMTString().replace('GMT', '')
        })
    }

    searchBikes(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.searchEvent(event.target.value)
        }
    }
    searchEvent(input) {
        const searchedArray = this.state.originData.filter((el) => {
            const pureEl = el.title.replace(/[\W_]/g, '').toLowerCase()
            const toBeSearched = input.replace(/[\W_]/g, '').toLowerCase()
            return pureEl.includes(toBeSearched)
        })
        this.setState({
            dataOnview: searchedArray,
            fromSearch: input
        })
        document.getElementById('from').value = ''
        document.getElementById('to').value = ''
        this.setState({
            from: null
        })
        return
    }

    clearSearch() {
        document.getElementById('search').value = ''
        document.getElementById('from').value = ''
        document.getElementById('to').value = ''
        this.setState({
            dataOnview: this.state.originData,
            fromSearch: null,
            to: null,
            from: null,
            fromDate: null
        })
    }

    fromDate(event) {
        this.setState({
            minData: event.target.value,
            from: new Date(event.target.value).getTime() / 1000
        })
    }

    async toDate(event) {
        if (this.state.from) {

            this.setState({
                to: new Date(`${event.target.value} 24:00`).getTime() / 1000
            })
            if (!this.state.fromSearch) {
                const filteredArray = this.state.originData.filter((el) => {
                    const elConditon = this.state.from <= el.occurred_at && el.occurred_at <= new Date(`${event.target.value} 24:00`).getTime() / 1000
                    return elConditon
                })
                this.setState({
                    dataOnview: filteredArray
                })
            } else {

                const filteredArray = this.state.originData.filter((el) => {
                    const pureEl = el.title.replace(/[\W_]/g, '').toLowerCase()
                    const toBeSearched = this.state.fromSearch.replace(/[\W_]/g, '').toLowerCase()
                    const elConditon = this.state.from <= el.occurred_at && el.occurred_at <= new Date(`${event.target.value} 24:00`).getTime() / 1000
                    return elConditon && pureEl.includes(toBeSearched)
                })

                this.setState({
                    dataOnview: filteredArray
                })
            }
            this.setState({
                fromDate: true
            })
        }
    }
    render() {

        return <div className="container mt-5">
            <p className="f-12 text-danger font-weight-bold mx-3">{this.state.totalInfo}</p>
            <div className="row d-flex align-items-center position-relative">
                <div className="col-7 ">
                    <Input id="search" onClick={(event) => this.searchBikes(event)} type="text" />

                </div>
                <label className="px-2">From:</label> <Input id="from" type="date" onChange={(event) => this.fromDate(event)} />
                <label className="px-2">To:</label><Input id="to" disable={this.state.from ? false : true} min={this.state.minData} onChange={(event) => this.toDate(event)} type="date" />
                {(this.state.fromSearch || this.state.fromDate) && <button className="btn border position-absolute search-cross" onClick={this.clearSearch}>Clear</button>}
            </div>
            {this.state.fromSearch ? <p>{`Search Result for '${this.state.fromSearch}' - ${this.state.dataOnview.length} results`}</p> : ''}
            <Pagination data={this.state.dataOnview} size="10" />
        </div>
    }

}
export default HomePage;
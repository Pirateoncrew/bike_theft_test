import React, { ChangeEvent, Component, ComponentProps, useState } from 'react'
import Pagination from '../../components/pagination/pagination'
import { data } from '../data'
import Input from '../../components/input/input'
import { BikeInfoModel, DataModel } from '../../model/dataModel'
import './home_page.css'
interface InputProps {
  id: string
  onChange: (event: any) => void
  disable: any
  readonly min: any
  readonly type: string
}
interface HomePageState {
  dataOnview: DataModel[]
  originData: DataModel[]
  minData: number
  from: number
  to: number
  totalInfo: string
  fromSearch: string
  fromDate: boolean
  searchInput: string
  fromInput: Date
  toInput: Date
}

class HomePage extends React.Component<any, HomePageState> {
  state: HomePageState = {
    dataOnview: [],
    originData: [],
    minData: 0,
    from: 0,
    to: 0,
    totalInfo: '',
    fromSearch: '',
    searchInput: '',
    fromDate: false,
    fromInput: new Date(),
    toInput: new Date()
  }

  componentDidMount() {
    this.clearSearch = this.clearSearch.bind(this)
    this.searchChange = this.searchChange.bind(this)
    this.pagination()
  }

  async pagination() {
    const origiData: any = data.sort((a, b) => {
      return a.occurred_at - b.occurred_at
    })
    await this.setState({
      dataOnview: origiData,
      originData: origiData,
      totalInfo:
        origiData.length +
        '\tBike has been reported from\t' +
        new Date(origiData[0].updated_at * 1000)
          .toUTCString()
          .replace('GMT', '') +
        '\tTo\t' +
        new Date(origiData[origiData.length - 1].updated_at * 1000)
          .toUTCString()
          .replace('GMT', '')
    })
  }

  searchBikes(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault()
      const target: any = event.target
      this.searchEvent(target?.value)
    }
  }

  searchEvent(input: string) {
    const searchedArray = this.state.originData.filter((el: BikeInfoModel) => {
      const pureEl = el.title.replace(/[\W_]/g, '').toLowerCase()
      const toBeSearched = input.replace(/[\W_]/g, '').toLowerCase()
      return pureEl.includes(toBeSearched)
    })
    this.setState({
      dataOnview: searchedArray,
      fromSearch: input
    })
    this.setState({
      from: 0
    })
    return
  }

  clearSearch() {
    this.setState({
      dataOnview: this.state.originData,
      fromSearch: '',
      to: 0,
      from: 0,
      fromDate: false,
      searchInput: '',
      fromInput: new Date(),
      toInput: new Date()
    })
  }

  fromDate(event: any) {
    this.setState({
      minData: event.target.value,
      from: new Date(event.target.value).getTime() / 1000,
      fromInput: event.target.value
    })
  }

  async toDate(event: any) {
    if (this.state.fromInput) {
      this.setState({
        to: new Date(`${event.target.value} 24:00`).getTime() / 1000,
        toInput: event.target.value
      })
      if (!this.state.fromSearch) {
        const filteredArray = this.state.originData.filter((el) => {
          const elConditon =
            this.state.from <= el.occurred_at &&
            el.occurred_at <=
              new Date(`${event.target.value} 24:00`).getTime() / 1000
          return elConditon
        })
        this.setState({
          dataOnview: filteredArray
        })
      } else {
        const filteredArray = this.state.originData.filter(
          (el: { title: string; occurred_at: number }) => {
            const pureEl = el.title.replace(/[\W_]/g, '').toLowerCase()
            const toBeSearched = this.state.fromSearch
              .replace(/[\W_]/g, '')
              .toLowerCase()
            const elConditon =
              this.state.from <= el.occurred_at &&
              el.occurred_at <=
                new Date(`${event.target.value} 24:00`).getTime() / 1000
            return elConditon && pureEl.includes(toBeSearched)
          }
        )

        this.setState({
          dataOnview: filteredArray
        })
      }
      this.setState({
        fromDate: true
      })
    }
  }

  searchChange(event: any) {
    this.setState({
      searchInput: event.target.value
    })
  }

  render() {
    return (
      <div className="container mt-5">
        <p className="f-12 text-danger font-weight-bold mx-3">
          {this.state.totalInfo}
        </p>
        <div className="row d-flex align-items-center position-relative">
          <div className="col-7 ">
            <Input
              id="search"
              value={this.state.searchInput}
              onChange={(event: any) => this.searchChange(event)}
              onClick={(event: any) => this.searchBikes(event)}
              type="text"
            />
          </div>
          <label className="px-2">From:</label>{' '}
          <Input
            id="from"
            value={this.state.fromInput}
            type="date"
            onChange={(event: any) => this.fromDate(event)}
          />
          <label className="px-2">To:</label>
          <Input
            id="to"
            value={this.state.toInput}
            disable={this.state.from ? false : true}
            min={this.state.minData}
            onChange={(event: any) => this.toDate(event)}
            type="date"
          />
          {(this.state.fromSearch || this.state.fromDate) && (
            <button
              className="btn border position-absolute search-cross"
              onClick={this.clearSearch}
            >
              Clear
            </button>
          )}
        </div>
        {this.state.fromSearch ? (
          <p>{`Search Result for '${this.state.fromSearch}' - ${this.state.dataOnview.length} results`}</p>
        ) : (
          ''
        )}
        <Pagination data={this.state.dataOnview} size="10" />
      </div>
    )
  }
}
export default HomePage

import React, { useState, useEffect } from 'react'
import { BikeInfoModel, DataModel } from '../../model/dataModel'
import Cards from '../cards/cards'
import Modal from '../modal/modal'
import './pagination.css'
interface PaginationModel {
  data: DataModel[]
  size?: any
}

interface PaginationState {
  slicedData: DataModel[]
  originalData: DataModel[]
  currentPage: number
  showModal: boolean
  selectedData: any
}

export default class Pagination extends React.Component<
  PaginationModel,
  PaginationState
> {
  state: PaginationState = {
    slicedData: [],
    originalData: [],
    currentPage: 1,
    showModal: false,
    selectedData: {}
  }

  constructor(props: PaginationModel | Readonly<PaginationModel>) {
    super(props)
  }

  componentDidUpdate(
    prevProp: { data: string | any[] },
    prevState: { currentPage: any }
  ) {
    if (!prevState.currentPage) {
      this.setState({
        originalData: this.props.data,
        slicedData: this.props.data.slice(0, this.props.size),
        currentPage: 1
      })
    } else if (
      prevState.currentPage &&
      this.props.data.length !== prevProp.data.length
    ) {
      this.setState({
        originalData: this.props.data,
        slicedData: this.props.data.slice(0, this.props.size),
        currentPage: 1
      })
      return
    }
  }

  paginationNext(size: number) {
    if (
      this.state.currentPage !==
      this.state.originalData.length / this.props.size
    ) {
      this.setState({
        slicedData: this.props.data.slice(
          10 * this.state.currentPage,
          size * (this.state.currentPage + 1)
        ),
        currentPage: this.state.currentPage + 1
      })
    }
  }

  paginationPrev(size: number) {
    if (this.state.currentPage > 1) {
      this.setState({
        slicedData: this.props.data.slice(
          10 * (this.state.currentPage - 1) - 10,
          size * (this.state.currentPage - 1)
        ),
        currentPage: this.state.currentPage - 1
      })
    }
  }

  showModalEvent(currentIndex: number) {
    this.setState({
      showModal: !this.state.showModal,
      selectedData: this.state.slicedData[currentIndex]
    })
  }

  onview() {
    return (
      <section className=" my-5">
        {
          <Modal
            show={this.state.showModal}
            selectedData={this.state.selectedData}
            showEvent={(event) => this.showModalEvent(event)}
          />
        }
        <div className="d-flex justify-content-end mx-4 align-items-center">
          <p className="mb-0" aria-label="page">
            Page:{this.state.currentPage}-
            {Math.ceil(this.state.originalData.length / this.props.size)}
          </p>
          <span>
            {this.state.slicedData.length <= 10 ? (
              <div className="d-flex">
                <button
                  type="button"
                  disabled={!(this.state.currentPage > 1)}
                  onClick={() => this.paginationPrev(10)}
                  className="btn btn-secondary mx-3"
                  aria-label="prev"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={
                    this.state.currentPage >=
                    Math.ceil(this.state.originalData.length / this.props.size)
                  }
                  onClick={() => this.paginationNext(10)}
                  className="btn btn-primary"
                  aria-label="next"
                >
                  Next
                </button>
              </div>
            ) : (
              ''
            )}
          </span>
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {this.state.slicedData.length ? (
            this.state.slicedData.map((el, i) => {
              return (
                <span key={i} onClick={() => this.showModalEvent(i)}>
                  <Cards data={el} />
                </span>
              )
            })
          ) : (
            <p className="w-100 text-cetner text-secondary h1 py-5">
              No Result Found
            </p>
          )}
        </div>
      </section>
    )
  }

  render() {
    return this.onview()
  }
}

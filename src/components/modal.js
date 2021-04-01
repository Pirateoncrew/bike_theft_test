import React, { useState, useEffect } from 'react'

export default class Modal extends React.Component {

    constructor(props) {
        super(props)
    }

    onView() {
        return this.props.show ? <div class="modal" id="modelId">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{this.props.selectedData.title}</h5>
                        <button type="button" onClick={() => this.props.showEvent(null)} class="close" data-dismiss="modal" aria-label="Close">
                            <span >&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            {this.props.selectedData.media.image_url_thumb ? <img height="250" src={this.props.selectedData.media.image_url_thumb} /> : <p class="w-100 textcenter my-5 text-secondary">NO IMAGE</p>}
                            <div className="d-flex justify-content-between my-3">
                                <i class="fas fa-clock  d-flex ">
                                    <p className="ml-2 mb-0"> Theft At : {
                                        new Date(this.props.selectedData.occurred_at * 1000).toGMTString().replace('GMT', '')
                                    }</p>
                                </i>
                                <i className=" d-flex fas fa-clock ">
                                    <p className="ml-2"> Reported At :{
                                        new Date(this.props.selectedData.updated_at * 1000).toGMTString().replace('GMT', '')
                                    }</p>
                                </i>
                                <i className=" fas fa-location d-flex  text-left">
                                    <p className="ml-2"> {this.props.selectedData.address}</p>
                                </i>
                            </div>
                            {this.props.selectedData.description ? <p class="text-left">{this.props.selectedData.description}</p> : <p class="w-100 textcenter my-5 text-secondary">NO DESCRIPTION</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div> : ''
    }

    render() {
        return this.onView()
    }
}
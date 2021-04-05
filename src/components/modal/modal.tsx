import React from 'react'
import { BikeInfoModel } from '../../model/dataModel'
import './modal.css'
interface ModalModel {
  show: boolean
  showEvent: (event: any) => void
  selectedData: BikeInfoModel
}

export default class Modal extends React.Component<ModalModel, any> {
  constructor(props: ModalModel | Readonly<ModalModel>) {
    super(props)
  }

  onView() {
    return this.props.show ? (
      <div className="modal" id="modelId">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.selectedData?.title}</h5>
              <button
                type="button"
                onClick={() => this.props.showEvent(null)}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid d-flex flex-column  align-items-center">
                {this.props.selectedData?.media.image_url_thumb ? (
                  <img
                    height="250"
                    src={this.props.selectedData?.media.image_url_thumb}
                  />
                ) : (
                  <p className="w-100 text-center my-5 text-secondary">
                    NO IMAGE
                  </p>
                )}
                <div className="d-flex justify-content-between w-100 my-3">
                  <i className="fas fa-clock  d-flex ">
                    <p className="ml-2 mb-0">
                      {' '}
                      Theft At :{' '}
                      {new Date(this.props.selectedData?.occurred_at * 1000)
                        .toUTCString()
                        .replace('GMT', '')}
                    </p>
                  </i>
                  <i className=" d-flex fas fa-clock ">
                    <p className="ml-2">
                      {' '}
                      Reported At :
                      {new Date(this.props.selectedData?.updated_at * 1000)
                        .toUTCString()
                        .replace('GMT', '')}
                    </p>
                  </i>
                  <i className=" fas fa-location d-flex  text-left">
                    <p className="ml-2"> {this.props.selectedData?.address}</p>
                  </i>
                </div>
                {this.props.selectedData?.description ? (
                  <p className="text-left">
                    {this.props.selectedData?.description}
                  </p>
                ) : (
                  <p className="w-100 text-center my-5 text-secondary">
                    NO DESCRIPTION
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ''
    )
  }

  render() {
    return this.onView()
  }
}

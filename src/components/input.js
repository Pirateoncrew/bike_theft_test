import React, { useState, useEffect } from 'react'

export default class Input extends React.Component {

    constructor(props) {
        super(props)
    }

    onView() {
        return <div className="form-group">
            <input id={this.props.id} onChange={this.props.onChange}
                className="form-control" disabled={this.props.disable} min={this.props.min} type={this.props.type} onKeyDown={(event) => this.props.onClick(event)} aria-describedby="helpId" placeholder="Search" />
        </div>
    }

    render() {
        return this.onView()
    }
}
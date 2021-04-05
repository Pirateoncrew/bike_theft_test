import React from 'react'
import './input.css'

class Input extends React.Component<any, any> {
  constructor(props: any | Readonly<any>) {
    super(props)
  }

  onView() {
    return (
      <div className="form-group">
        <input
          value={this.props.value}
          id={this.props.id}
          title={this.props.id}
          onChange={this.props.onChange}
          className="form-control"
          disabled={this.props.disable}
          min={this.props.min}
          type={this.props.type}
          onKeyDown={(event) => this.props.onClick(event)}
          placeholder="Search"
          aria-label="cost-input"
        />
      </div>
    )
  }

  render() {
    return this.onView()
  }
}

export default Input

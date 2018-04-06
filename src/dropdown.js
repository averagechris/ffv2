import React, { Component } from "react";

export class Dropdown extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let { onChange } = this.props;

    if (onChange) {
      onChange({ oldValue: this.state.selected, newValue: e.target.value });
    }
    this.setState({ selected: e.target.value });
  }

  render() {
    let { options, defaultSelectMessage } = this.props;
    return (
      <div>
        <select
          className="db pv1 ph3 f4 dark-gray pointer"
          value={this.state.selected}
          onChange={this.handleChange}
        >
          <option value="" key="default-option">
            {defaultSelectMessage}
          </option>
          {options.map(o => (
            <option key={`option-${o.value}`} value={o.value}>
              {o.description}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

Dropdown.defaultProps = { defaultSelectMessage: "Please choose one" };

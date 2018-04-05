import React, { Component } from "react";

export class FormField extends Component {
  render() {
    let { label, refFunc, ...restProps } = this.props;
    let id = `${label}-input`;
    return (
      <div className="">
        <label htmlFor={id} className="f6 b db mb2">
          {label}
        </label>
        <input
          id={id}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          name={label}
          type="text"
          aria-describedby="name-desc"
          ref={refFunc}
          autoComplete="off"
          {...restProps}
        />
      </div>
    );
  }
}

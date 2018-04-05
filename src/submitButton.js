import React, { Component } from "react";

export class SubmitButton extends Component {
  render() {
    let { text, restProps } = this.props;
    return (
      <button
        className="f5 dim br3 ph3 pv2 mb2 dib white ttu bg-orange pointer"
        {...restProps}
      >
        {text}
      </button>
    );
  }
}

SubmitButton.defaultProps = {
  text: "submit"
};

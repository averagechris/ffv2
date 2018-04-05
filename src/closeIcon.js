import React, { Component } from "react";

export class CloseIcon extends Component {
  constructor() {
    super();
  }
  render() {
    let { color, opacity, onClick } = this.props;
    return (
      <div className="pointer" onClick={onClick}>
        <svg
          height="12px"
          width="12px"
          version="1.1"
          xmlns="http://www.w3.org/svg"
        >
          <line
            x1="1"
            y1="11"
            x2="11"
            y2="1"
            stroke={color}
            strokeOpacity={opacity}
            strokeWidth="2px"
          />
          <line
            x1="1"
            y1="1"
            x2="11"
            y2="11"
            stroke={color}
            strokeOpacity={opacity}
            strokeWidth="2px"
          />
        </svg>
      </div>
    );
  }
}

CloseIcon.defaultProps = {
  color: "black",
  opacity: "0.6",
  onClick: () => console.log("clicked closeIcon")
};

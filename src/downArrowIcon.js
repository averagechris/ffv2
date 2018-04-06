import React, { Component } from "react";

export class DownArrowIcon extends Component {
    constructor() {
        super();
    }
    render() {
        let { color, opacity, onClick } = this.props;
        return (
                <div className="pointer" onClick={onClick}>
                <svg
            height="20px"
            width="20px"
            version="1.1"
            xmlns="http://www.w3.org/svg"
                >
                <line
            x1="1"
            y1="20"
            x2="11"
            y2="5"
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

DownArrowIcon.defaultProps = {
    color: "black",
    opacity: "0.6",
    onClick: () => console.log("clicked closeIcon")
};

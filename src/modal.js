import React, { Component } from "react";
import Tachyons from "tachyons/css/tachyons.min.css";

import { CloseIcon } from "./closeIcon.js";
import { Form } from "./form.js";

export class Modal extends Component {
  constructor() {
    super();
  }

  render() {
    let { hidden, onClose, title, ...restProps } = this.props;

    return (
      <div className={hidden ? "dn" : ""}>
        <div className="fixed top-0 left-0 db z-1 w-100 h-100 pt5 bg-black-40 overflow-container dark-gray sans-serif">
          <div
            className={
              "relative top-0 top-1-m top-2-ns mw7-m mw8-ns center br3 .shadow-4 bg-white pa2"
            }
          >
            <div className="flex">
              <CloseIcon className="inline-flex" onClick={onClose} />
              <h1 className="inline-flex center tracked b ttu f2 lh-title">
                {title}
              </h1>
            </div>
            <hr />
            <Form {...restProps} />
          </div>
        </div>
      </div>
    );
  }
}

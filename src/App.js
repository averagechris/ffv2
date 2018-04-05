import React, { Component } from "react";
import Tachyons from "tachyons/css/tachyons.min.css";

import "./App.css";

import { Modal } from "./modal.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modalHidden: true };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleModalHide = this.toggleModalHide.bind(this);
  }

  handleKeyDown(e) {
    if (e.key == "Escape") {
      this.closeModal();
    }
  }

  handleFormSubmit(formData) {
    console.log(formData);
  }

  closeModal() {
    !this.state.modalHidden && this.toggleModalHide();
  }

  toggleModalHide() {
    this.setState(prevState => ({ modalHidden: !prevState.modalHidden }));
  }

  render() {
    let { modalHidden } = this.state;

    return (
      <div className="" onKeyDown={this.handleKeyDown}>
        {modalHidden ? (
          <a href="#" onClick={this.toggleModalHide}>
            Click me
          </a>
        ) : (
          <Modal
            hidden={this.state.modalHidden}
            title="Fast File"
            onClose={this.toggleModalHide}
            onSubmit={this.handleFormSubmit}
          />
        )}
      </div>
    );
  }
}

export default App;

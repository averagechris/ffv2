import "tachyons/css/tachyons.min.css";
import React, { Component } from "react";
import { Modal } from "basic-react-component-library";

import JiraForm from "./jiraForm.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modalHidden: false }; //TODO: in production change this to true

    this.toggleModalHide = this.toggleModalHide.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  closeModal() {
    !this.state.modalHidden && this.toggleModalHide();
  }

  toggleModalHide() {
    this.setState(prevState => ({ modalHidden: !prevState.modalHidden }));
  }

  renderToolbar() {
    return (
      <a href="#" onClick={this.toggleModalHide}>
        Click me
      </a>
    );
  }

  render() {
    let { modalHidden } = this.state;

    return (
      <div className="">
        {modalHidden ? (
          this.renderToolbar()
        ) : (
          <Modal
            handleClose={this.toggleModalHide}
            containerClasses={["tc center"]}
          >
            <h1 className="tracked b ttu f2 lh-title tc">Fast File</h1>
            <hr />
            <JiraForm />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

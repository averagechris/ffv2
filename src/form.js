import React, { Component } from "react";

import { FormField } from "./formField.js";
import { SubmitButton } from "./submitButton.js";

export class Form extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.fieldRefs = this.fieldRefs.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let formData = this.fieldRefs().reduce(
      (formData, field) => ({
        ...formData,
        [field.name.toLowerCase()]: field.value
      }),
      {}
    );

    this.props.onSubmit(formData);
  }

  fieldRefs() {
    return Object.keys(this)
      .filter(k => k.endsWith("Field"))
      .map(k => this[k]);
  }

  clearForm() {
    this.fieldRefs().forEach(f => (f.value = ""));
  }

  render() {
    return (
      <form className="pa1 ph3-m ph4-ns" onSubmit={this.handleSubmit}>
        <FormField
          label="Summary"
          maxLength={255}
          refFunc={input => (this.summaryField = input)}
        />
        <div className="tc">
          <SubmitButton onClick={this.handleSubmit} />
        </div>
      </form>
    );
  }
}

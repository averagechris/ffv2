import React, { Component } from "react";

import { FormField } from "./formField.js";
import { SubmitButton } from "./submitButton.js";
import { TextEditor } from "./textEditor.js";
import { CategoryChooser } from "./CategoryChooser.js";
import { ReferencesField } from "./referencesField.js";

export class Form extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.collectTextEditorContents = this.collectTextEditorContents.bind(this);
    this.fieldRefs = this.fieldRefs.bind(this);
    this.handleCategorySelection = this.handleCategorySelection.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateReferences = this.validateReferences.bind(this);
  }

  collectTextEditorContents(markdown) {
    this.setState((prevState, currentProps) => ({ ...prevState, markdown }));
  }

  handleCategorySelection(o) {
    this.setState(prevState => ({ ...prevState, category: o.newValue }));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateForm();
    return;

    let formData = this.fieldRefs().reduce(
      (formData, field) => ({
        ...formData,
        [field.name.toLowerCase()]: field.value
      }),
      {}
    );
    let markdown = this.state.markdown ? this.state.markdown : "";
    this.props.onSubmit({ ...formData, ...this.state, markdown });
  }

  validateForm() {
    let fields = this.fieldRefs();
    this.validateReferences(fields);
  }

  validateReferences(allFields) {
    let referenceInput = allFields.filter(f => f.name === "References").pop();
    let emailPattern = new RegExp(".*@.*\\.(\\.?\\w{2,}){1,3}");
    let eventbriteIDsPattern = new RegExp("d{5,}");
    let rawValue = referenceInput.value;
    let emails = emailPattern.exec(rawValue) || [];
    let eventbriteIds = eventbriteIDsPattern.exec(rawValue) || [];

    let matches = emails + eventbriteIds;

    console.log(emails);
    /* referenceInput.value */
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
        <CategoryChooser
          defaultSelectMessage="What's the impact?"
          onChange={this.handleCategorySelection}
        />
        <FormField
          label="References"
          refFunc={input => (this.referencesField = input)}
        />
        <TextEditor onChange={this.collectTextEditorContents} />
        <div className="tc">
          <SubmitButton onClick={this.handleSubmit} />
        </div>
      </form>
    );
  }
}

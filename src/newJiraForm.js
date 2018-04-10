import React, { Component } from "react";
import { Button, Form, FormInput } from "basic-react-component-library";

class JiraForm extends Component {
  constructor() {
    super();
    this.state = {
      references: {
        emails: [],
        eventIds: [],
        orderIds: []
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setReferences = this.setReferences.bind(this);
    this.transformationsOnChange = this.transformationsOnChange.bind(this);
  }

  handleSubmit(formData) {
    console.log(formData);
  }

  setReferences(value) {
    let newEmails =
      value.match(/\b[a-z.+-_]+@[a-z.+-_]+(?:\.\w+){1,3}\b/g) || [];
    let newEventIds = value.match(/\b\d{11,12}\b/g) || [];
    let newOrderIds = value.match(/\b\d{8,10}\b/g) || [];
    this.setState(s => {
      let emails = new Set([...s.references.emails, ...newEmails]);
      let eventIds = new Set([...s.references.eventIds, ...newEventIds]);
      let orderIds = new Set([...s.references.orderIds, ...newOrderIds]);
      return {
        ...s,
        references: {
          emails: [...emails],
          eventIds: [...eventIds],
          orderIds: [...orderIds]
        }
      };
    });
  }

  transformationsOnChange() {
    let transformationFunctions = [
      ({ fieldName, value }) => {
        if (fieldName === "References") {
          this.setReferences(value);
          return "";
        }
      }
    ];
    return transformationFunctions;
  }
  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        applyToChanges={this.transformationsOnChange()}
      >
        <FormInput
          name="Summary"
          placeholder="fucking title of the fucking jira ticket bruh"
        />
        <FormInput
          name="References"
          placeholder="paste account emails, event or order ids"
        />

        <div className="tc">
          <Button text="SUBMIT" onClick={() => {}} />
        </div>
      </Form>
    );
  }
}

export default JiraForm;

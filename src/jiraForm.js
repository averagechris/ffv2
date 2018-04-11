import React, { Component } from "react";
import {
  Button,
  CloseIcon,
  Form,
  FormInput,
  TagItem
} from "basic-react-component-library";

const ReferenceItem = ({ value, onClick, toRemove, ...props }) => (
  <TagItem
    additionalContainerClasses={["ma1", "blue"]}
    additionalValueClasses={["dib underline-hover"]}
    name={value}
    value={value}
    onClick={onClick}
    {...props}
  >
    <CloseIcon
      additionalContainerClasses={["dim"]}
      color="gray"
      size="small"
      onClick={toRemove}
    />
  </TagItem>
);

class JiraForm extends Component {
  constructor() {
    super();
    this.state = {
      references: {
        emails: new Set(),
        eventIds: new Set(),
        orderIds: new Set()
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addReferenceItems = this.addReferenceItems.bind(this);
    this.removeReferenceItem = this.removeReferenceItem.bind(this);
    this.transformationsOnChange = this.transformationsOnChange.bind(this);
  }
  _formatReferencesToMarkupString({ emails, eventIds, orderIds }) {
    let adminUrl = "https://admin.eventbrite.com/?q=";
    let emailStr = [...emails].reduce(
      (t, email) =>
        (t += `[${email}|${adminUrl}${encodeURIComponent(email)}]\n`),
      ""
    );
    let eventIdStr = [...eventIds].reduce(
      (t, eid) => (t += `eid: [${eid}|${adminUrl}${eid}]\n`),
      ""
    );
    let orderIdStr = [...orderIds].reduce(
      (t, oid) => (t += `oid: [${oid}|${adminUrl}${oid}]\n`),
      ""
    );
    // TODO: orderId admin url is _NOT_ the same
    return emailStr + eventIdStr + orderIdStr;
  }
  handleSubmit(formData) {
    let references = this._formatReferencesToMarkupString(
      this.state.references
    );
    console.log(references);
    let data = { ...formData, References: references };
    console.log(data);
  }
  addReferenceItems(value) {
    let newEmails =
      value.match(/\b[a-z.+-_]+@[a-z.+-_]+(?:\.\w+){1,3}\b/g) || [];
    let newEventIds = value.match(/\b\d{11,12}\b/g) || [];
    let newOrderIds = value.match(/\b\d{8,10}\b/g) || [];
    this.setState(s => {
      return {
        ...s,
        references: {
          emails: new Set([...s.references.emails, ...newEmails]),
          eventIds: new Set([...s.references.eventIds, ...newEventIds]),
          orderIds: new Set([...s.references.orderIds, ...newOrderIds])
        }
      };
    });
  }
  removeReferenceItem(type, value) {
    this.setState(s => {
      let newReferences = new Set([...s.references[type]]);
      newReferences.delete(value);

      return {
        ...s,
        references: { ...s.references, [type]: newReferences }
      };
    });
  }
  transformationsOnChange() {
    let transformationFunctions = [
      ({ fieldName, value }) => {
        if (fieldName === "References") {
          this.addReferenceItems(value);
          return "";
        }
      }
    ];
    return transformationFunctions;
  }
  render() {
    let { references } = this.state;
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
        <div>
          {[...references.emails].map((r, i) => (
            <ReferenceItem
              key={`reference-email-${r}-${i}`}
              value={r}
              toRemove={() => this.removeReferenceItem("emails", r)}
            />
          ))}
          {[...references.eventIds].map((r, i) => (
            <ReferenceItem
              key={`reference-event-${r}-${i}`}
              value={`oid: ${r}`}
              toRemove={() => this.removeReferenceItem("eventIds", r)}
            />
          ))}
          {[...references.orderIds].map((r, i) => (
            <ReferenceItem
              key={`reference-order-${r}-${i}`}
              value={`eid: ${r}`}
              toRemove={() => this.removeReferenceItem("orderIds", r)}
            />
          ))}
        </div>
        <div className="tc">
          <Button text="SUBMIT" onClick={() => {}} />
        </div>
      </Form>
    );
  }
}

export default JiraForm;

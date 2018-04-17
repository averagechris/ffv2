import React, { Component } from "react";
import {
  Button,
  Form,
  FormInput,
  Spinner
} from "basic-react-component-library";

import { createJiraIssueSUP } from "./utils/jiraRequest.js";
import CategorySelect from "./CategorySelect.js";
import ReferenceItem from "./ReferenceItem.js";

class JiraForm extends Component {
  constructor() {
    super();
    this.state = {
      // gets value from CategorySelect dropdown
      category: { error: false, value: "" },
      // gets values from pasting in emails, event ids, order ids into the references field
      references: {
        error: false,
        emails: new Set(),
        eventIds: new Set(),
        orderIds: new Set()
      },
      // gets set to true when there's async network requests going on
      loading: false,

      // value gets set to {issueKey: "SUP-WHATEVER", summary: "whatever"}
      createdJiraTicket: { error: false, value: false }
    };
    [
      "handleSubmit",
      "addReferenceItems",
      "removeReferenceItem",
      "transformationsOnChange",
      "updateCategory",
      "_formatReferencesToMarkupString",
      "_formatDescription",
      "onCreateIssuePost"
    ].forEach(f => (this[f] = this[f].bind(this)));
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
  _formatDescription(str, references) {
    return `${str}\n----\n*REFERENCES*\n${references}\n`;
  }
  handleSubmit(formData) {
    let { references, category } = this.state;
    let description = this._formatDescription(
      "*STR*\n1. go to some page\n2. do other stuff\n*expected*: good stuff\n*actual*: bad stuff",
      this._formatReferencesToMarkupString(references)
    );
    let data = {
      description,
      summary: formData.summary,
      priority: category.value,
      labels: []
    };

    createJiraIssueSUP(
      data,
      () => this.setState(s => ({ ...s, loading: true })),
      this.onCreateIssuePost
    );
  }
  onCreateIssuePost(promise) {
    promise
      .then(response => {
        response
          .text()
          .then(t => {
            let {
              issueKey,
              createIssueDetails: { fields: { summary } }
            } = JSON.parse(t);
            this.setState(s => ({
              ...s,
              createdJiraTicket: { error: false, value: { issueKey, summary } }
            }));
          })
          // reading of the response body failed -- the ticket _may_ have been created
          .catch(e =>
            this.setState(s => ({
              ...s,
              createdJiraTicket: { error: true, value: e }
            }))
          );
      })
      // the request failed -- the ticket probably wasn't created
      .catch(e =>
        this.setState(s => ({
          ...s,
          createdJiraTicket: { error: true, value: e }
        }))
      );
  }
  updateCategory(e) {
    this.setState(s => ({ ...s, category: e.value }));
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
        if (fieldName === "references") {
          this.addReferenceItems(value);
          return "";
        }
      }
    ];
    return transformationFunctions;
  }
  render() {
    let { category, loading, references } = this.state;

    return loading ? (
      <Spinner size={5} />
    ) : (
      <Form
        onSubmit={this.handleSubmit}
        applyToChanges={this.transformationsOnChange()}
      >
        <FormInput
          name="Summary"
          placeholder="fucking title of the fucking jira ticket bruh"
        />
        <CategorySelect value={category} onChange={this.updateCategory} />
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

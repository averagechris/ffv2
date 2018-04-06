import React, { Component } from "react";

import { FormField } from "./formField.js";

export class ReferencesField extends Component {
  render() {
    return <FormField label="References" {...this.props} />;
  }
}

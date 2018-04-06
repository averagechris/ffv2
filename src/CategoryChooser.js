import React, { Component } from "react";
import { Dropdown } from "./dropdown.js";

export class CategoryChooser extends Component {
    render() {
        let categories = [
            {value: "Critical", description: "A wide-spread, business critical issue - tickets cannot be sold"},
            {value: "Critical-Payments", description: "Pricing, fees, or payouts are wrong, or appear to be wrong"},
            {value: "Major", description: "Core functionality of a widely used feature is broken"},
            {value: "Minor", description: "Something doesn't look right, or isn't rendering correctly"},
        ];

        return (<Dropdown options={categories} {...this.props} />);
    }
}

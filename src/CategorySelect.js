import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

const CATEGORIES = [
  { label: "Critical", value: "Critical" },
  { label: "Payments Major", value: "Payments Major" },
  { label: "Major", value: "Major" },
  { label: "Minor", value: "Minor" },
  { label: "Trivial", value: "Trivial" }
];

const CategorySelect = ({ onChange, label, placeholder, value }) => {
  return (
    <div>
      <label>{label}</label>
      <Select
        onChange={onChange}
        options={CATEGORIES}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

CategorySelect.defaultProps = {
  label: "Category",
  placeholder: "Choose a category"
};

export default CategorySelect;

import React from "react";

import { storiesOf } from "@storybook/react";
/* import { action } from "@storybook/addon-actions"; */
/* import { linkTo } from "@storybook/addon-links"; */

import { Modal } from "../modal.js";
import { Dropdown } from "../dropdown.js";

storiesOf("Modal Container", module).add("visible", () => (
  <Modal
    onSubmit={a => console.log("hi", a)}
    hidden={false}
    title="FAST FILE"
  />
));

storiesOf("dropdown", module).add("basic", () => {
  let myListOfOptions = [
    { value: "major", description: "some really long string" },
    { value: "minor", description: "another one" },
    { value: "critical", description: "options three" }
  ];
  return <Dropdown options={myListOfOptions} onChange={c => console.log(c)} />;
});

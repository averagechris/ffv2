import React from "react";

import { storiesOf } from "@storybook/react";
/* import { action } from "@storybook/addon-actions"; */
/* import { linkTo } from "@storybook/addon-links"; */

import { Modal } from "../modal.js";

storiesOf("Modal Container", module).add("visible", () => (
  <Modal hidden={false} title="FAST FILE" />
));

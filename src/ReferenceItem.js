import React from "react";
import{
CloseIcon,
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

export default ReferenceItem;

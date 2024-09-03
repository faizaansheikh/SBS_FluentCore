import * as React from "react";
import { Checkbox } from "@fluentui/react-components";
import type { CheckboxProps } from "@fluentui/react-components";

export const BACheckBox = (props: CheckboxProps) => <Checkbox {...props} checked={props.checked} onChange={props.onChange}/>;
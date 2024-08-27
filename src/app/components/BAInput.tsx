import * as React from "react";
import {
    makeStyles,
    useId,
    Body1,
    Button,
    Input,
    Label,
} from "@fluentui/react-components";
import { MicRegular } from "@fluentui/react-icons";
import type { ButtonProps } from "@fluentui/react-components";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        // Prevent the example from taking the full width of the page (optional)
        maxWidth: "100%",
        // height:'50px',
        // Stack the label above the field (with 2px gap per the design system)
        "> div": { display: "flex", flexDirection: "column", gap: "0px" },
    },
});

const MicButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            {...props}
            appearance="transparent"
            icon={<MicRegular />}
            size="small"
        />
    );
};
// type propsType = {
//     value:any,
//     onChange:any,
//     type:any
// }
export const BAInput = (props: any) => {
    const { value, onChange, type, disabled, label } = props
    const styles = useStyles();

    const beforeId = useId("content-before");
    const inputId = useId("input");
    //   contentBefore={<PersonRegular />}
    // className={styles.root}
    return (
        <div >
            <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                <Label htmlFor={inputId} style={{ paddingInlineEnd: "5px",textWrap:'nowrap',width:'60%' }}>
                   {label}
                </Label>
                {/* <Label htmlFor={beforeId}>{label}</Label> */}
                <Input
                    // appearance="underline"
                    style={{width:'100%'}}
                    type={type}
                    id={inputId} 
                    // id={beforeId}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />

            </div>
        </div>
    );
};
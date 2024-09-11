"use client"
import * as React from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Field, Label, makeStyles, tokens } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";

const useStyles = makeStyles({
  control: {
    maxWidth: "300px",
  },
});

export const BADate = (props:any) => {
    const {label,detail,value,onChange,DatePickerProps} = props
  const styles = useStyles();
 
  return (
    <div >
    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
       {!detail && <Label className="d flex justify-center align-center" style={{ paddingInlineEnd: "5px", textWrap: 'nowrap', alignItems: 'center', width: '100%', color: tokens.colorBrandForeground2Pressed }}>
            {label}
            <div className="ml-1 w-full h-0 mt-2" style={{border: `1px dashed ${tokens.colorBrandForeground2Pressed}`,fontWeight:'lighter'}}> </div>
        </Label>} 
      
        <DatePicker
        className={styles.control}
        placeholder=""
        onChange={onChange}
        as="input"
        value={value}
        type="date"
        {...DatePickerProps}
      />

    </div>
</div>
  
  );
};
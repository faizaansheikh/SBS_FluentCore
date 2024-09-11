"use client"
import * as React from "react";

import { Field, Label, makeStyles, tokens } from "@fluentui/react-components";


const useStyles = makeStyles({
  control: {
    maxWidth: "300px",
  },
});

export const BADataText = (props:any) => {
    const {label,detail,body} = props
  const styles = useStyles();
//   const inputId = React.useId("input");
  return (
    <div >
    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
       {!detail && <Label className="d flex justify-center align-center" style={{ paddingInlineEnd: "5px", textWrap: 'nowrap', alignItems: 'center', width: '100%', color: tokens.colorBrandForeground2Pressed }}>
            {label}
            <div className="ml-1 w-full h-0 mt-2" style={{border: `1px dashed ${tokens.colorBrandForeground2Pressed}`,fontWeight:'lighter'}}> </div>
        </Label>} 
      
       <div className="w-full font-bold">
       {body}
       </div>

    </div>
</div>
  
  );
};
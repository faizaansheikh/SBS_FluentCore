"use client"
import * as React from "react";

import {
    SwitchProps,
    Switch,
    Label,
    tokens,
} from "@fluentui/react-components";

export const BASwitch = (props: any) => {
    return(
        <div>
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
        <Label  className="d flex justify-center align-center" style={{  textWrap: 'nowrap', alignItems: 'center', width: '50%', color: tokens.colorBrandForeground2Pressed }}>
            {props.label}
            <div className="ml-1 w-full h-0 mt-2" style={{border: `1px dashed ${tokens.colorBrandForeground2Pressed}`,fontWeight:'lighter'}}> </div>
        </Label>
        {/* <Label htmlFor={beforeId}>{label}</Label> */}
        <Switch  checked={props.value} onChange={props.onChange} />
    
    </div>
    </div>
     
    )
};
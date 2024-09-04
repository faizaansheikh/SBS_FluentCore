import * as React from "react";

import {
    makeStyles,
    useId,
    Label,
    tokens,
    Select
} from "@fluentui/react-components";
export const BASelect = (props: any) => {
    const { value, onChange, type, disabled, label, options,custom ,width} = props
    const selectId = useId();

    return (
        <>
            <div >
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    {!custom &&  <Label className="d flex justify-center align-center" style={{ paddingInlineEnd: "5px", textWrap: 'nowrap', alignItems: 'center', width: '100%', color: tokens.colorBrandForeground2Pressed }}>
                        {label}
                        <div className="ml-1 w-full h-0 mt-2" style={{ border: `1px dashed ${tokens.colorBrandForeground2Pressed}`, fontWeight: 'lighter' }}> </div>
                    </Label>}
                   
                    {/* <Label htmlFor={beforeId}>{label}</Label> */}
                    <Select id={`${selectId}-med`}
                        
                        size="medium"
                        onChange={onChange}
                        value={value}
                        style={{ width: width?width:'100%' }}
                    >
                        {options?.map((x: any, i: any) => (
                            <option key={i}>{x}</option>
                        ))}


                    </Select>

                </div>
            </div>





        </>
    );
};
"use client"

import * as React from "react";
import { Toolbar } from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";
import { BAButton } from "./BAButton";
import { ArrowCircleLeftRegular } from "@fluentui/react-icons";
import BAText from "./BAText";
import { AppBar } from "../dashboard/appbar/page";
import { ContextualMenuItem, getTagItemStyles, IContextualMenuItemProps, IContextualMenuStyles } from "@fluentui/react";
import { useRouter } from "next/navigation";


export default function BAScreenHeader(props: any) {
    const { headerOptions, label, title } = props
    const router = useRouter();
    const CustomMenuItem: React.FunctionComponent<IContextualMenuItemProps> = props => {
    
        return <ContextualMenuItem {...props} />;
    };
    const menuStyles: Partial<IContextualMenuStyles> = {
        subComponentStyles: { menuItem: getTagItemStyles, callout: {} },
    };
    const goBack = () => {
        
        router.back();
      };
   
    
    return (
        <>
            <Toolbar
                {...props}
                aria-label="Small"
                size="large"
                style={{
                    border: "2px solid black",
                    borderRadius: "8px",
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px'
                }}
            >
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <ArrowCircleLeftRegular fontSize="37px" style={{cursor:'pointer'}} onClick={goBack}/>
                    <BAText style={{margin:'0px 0px 1px 5px'}}>{title}</BAText>

                </div>

                <div style={{ display: 'flex',alignItems:'center' }}>
                  <div>
                
                  </div>
                    {headerOptions?.map((option: any, index: any) => (
                        <div style={{ marginRight: '10px' }}>{option.displayField()}</div>
                    ))}

                </div>
            </Toolbar>
        </>
    )
}
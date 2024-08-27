"use client"

import { useState } from "react";

import {

    tokens,

} from "@fluentui/react-components";
import { ArrowCircleLeftRegular, ArrowCircleRightRegular } from "@fluentui/react-icons";
export default function BAPagination(props: any) {
    const { totalCount, onPageChange } = props
    const [pageSize, setPageSize] = useState(10)
    const [pgNo, setPgNo] = useState(1)

    return (
        <div style={{ backgroundColor: tokens.colorSubtleBackgroundInvertedPressed, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="w-4/8 h-10 mb-2">
             <div></div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="d-flex justify-content-center alignItems-center flex-column">
               
                <div style={{ display: 'flex', flexDirection: 'row', width: '32px' ,justifyContent: 'center', alignItems: 'center'}} className={` text-center rounded `}>
              
                <div><ArrowCircleLeftRegular fontSize={40} /></div>
                    <div style={{margin:'5px'}}>
                        <p style={{ width: '32px',height:'32px', paddingTop: '3px', borderRadius:'5px',fontWeight: 'bold', border: `2px solid ${tokens.colorNeutralForeground1}` }}>1</p>
                    </div>
                     <div style={{margin:'5px'}}>
                        <p style={{ width: '32px',height:'32px', paddingTop: '3px', borderRadius:'5px',fontWeight: 'bold', border: `2px solid ${tokens.colorNeutralForeground1}` }}>1</p>
                    </div>
                     <div style={{margin:'5px'}}>
                        <p style={{ width: '32px',height:'32px', paddingTop: '3px', borderRadius:'5px',fontWeight: 'bold', border: `2px solid ${tokens.colorNeutralForeground1}` }}>1</p>
                    </div>
                    

                  
                <div><ArrowCircleRightRegular fontSize={40} /></div>
                </div>
            </div>
            
            <div style={{ fontSize: '20px', marginRight: '20px' }}>Total Records: 100</div>
        </div>
    )
}
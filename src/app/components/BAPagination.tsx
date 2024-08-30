"use client"

import { useState } from "react";

import {

    tokens,

} from "@fluentui/react-components";
import { ArrowCircleLeftRegular, ArrowCircleRightRegular } from "@fluentui/react-icons";
export default function BAPagination(props: any) {

    const { totalCount, onPageChange } = props
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [pgNo, setPgNo] = useState(1)
    const totalPages = Math.ceil(totalCount / pageSize);
    console.log(totalPages)
    return (
        <div style={{ backgroundColor: tokens.colorSubtleBackgroundInvertedPressed, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="w-4/8 h-10 mb-2">
             <div></div>
            <div style={{ display: 'flex ', justifyContent: 'center', alignItems: 'center' }} className="d-flex justify-content-center alignItems-center flex-column">
               
                <div style={{ display: 'flex', flexDirection: 'row', width: '32px' ,justifyContent: 'center', alignItems: 'center'}} className={` text-center rounded `}>
              
                <div><ArrowCircleLeftRegular fontSize={35} /></div>
                    <div style={{margin:'3px'}}>
                        <p style={{ width: '32px',height:'32px', paddingTop: '4px', borderRadius:'100%', border: `1px solid ${tokens.colorNeutralForeground1}` }}>1</p>
                    </div>
                     <div style={{margin:'3px'}}>
                        <p style={{ width: '32px',height:'32px', paddingTop: '4px', borderRadius:'100%', border: `1px solid ${tokens.colorNeutralForeground1}`}}>2</p>
                    </div>
                     <div style={{margin:'3px'}}>
                        <p style={{ width: '32px',height:'32px', paddingTop: '4px', borderRadius:'100%', border: `1px solid ${tokens.colorNeutralForeground1}` }}>3</p>
                    </div>
                    

                  
                <div><ArrowCircleRightRegular fontSize={35} /></div>
                </div>
            </div>
            
            <div style={{ fontSize: '20px', marginRight: '20px' }}>Total Records: {totalCount}</div>
        </div>
    )
}
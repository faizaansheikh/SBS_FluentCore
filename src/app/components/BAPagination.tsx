"use client"

import { useEffect, useState } from "react";

import {

    tokens,

} from "@fluentui/react-components";
import { ArrowCircleLeftRegular, ArrowCircleRightRegular } from "@fluentui/react-icons";
export default function BAPagination(props: any) {

    const { totalCount, onPageChange, flag } = props
  
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [pgNo, setPgNo] = useState(1)
    const [totalPage, setTotalPages] = useState<any>([])

    const [selectedItem, setSelectedItem] = useState<any>(1);
    const [isHovered, setIsHovered] = useState(false);
    
    const [show, setShow] = useState(true);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    let total = Math.ceil(totalCount / pageSize)
    const handlePagesClick = (page: any) => {
        

      
        onPageChange(page)
        setSelectedItem(page)
       
    }
    console.log(selectedItem);
    
    // const getPages = () => {

    //         for (let i = 1; i <= total; i++) {

    //             console.log(i);

    //             totalPage.push(i)
    //             setTotalPages([...totalPage])


    //         }


    // }
   

    const handlePageChange = (action: any) => {
        if (action === 'increment') {

            setSelectedItem(selectedItem + 1)
            handlePagesClick(selectedItem + 1)
        } else {
            setSelectedItem(selectedItem - 1)
            handlePagesClick(selectedItem - 1)
        }
    }

   

    return (
        <div style={{ backgroundColor: tokens.colorBrandBackground2Pressed, display: 'flex', justifyContent: flag === 'lookup' ? 'center' : 'space-between', alignItems: 'center' }} className="w-4/8 h-10 mb-2">
            {flag !== 'lookup' && <div style={{ fontSize: '20px' }}></div>}
            <div style={{ display: 'flex ', justifyContent: 'center', alignItems: 'center' }} className="d-flex justify-content-center alignItems-center flex-column">

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} className={` text-center rounded `}>

                    <div style={{ margin: '3px', cursor: isHovered && selectedItem >= 2 ? 'pointer' : '' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={selectedItem < 2 ? () => { } : () => handlePageChange('decrement')}

                    ><ArrowCircleLeftRegular style={{ color: selectedItem < 2 ? 'grey' : '' }} fontSize={35} /></div>
                    {

                       Array.from({ length: total }).map((pages: any, index) => (
                            <div
                                key={index}
                                style={{ margin: '3px', cursor: isHovered ? 'pointer' : '', color: selectedItem === index + 1 ? tokens.colorPaletteNavyBorderActive : tokens.colorNeutralForeground1 }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={(e: any) => {
                                    handlePagesClick(index + 1)
                                 
                                }
                                }
                            >
                                <p style={{ width: '32px', height: '32px', paddingTop: '4px', borderRadius: '100%', border: `1px solid ${selectedItem === index + 1 ? tokens.colorPaletteNavyBorderActive : tokens.colorNeutralForeground1}  ` }}>{index + 1}</p>
                            </div>
                        ))
                    }




                    <div
                        style={{ margin: '3px', cursor: isHovered && selectedItem !== total ? 'pointer' : '' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={selectedItem === total ? () => { } : () => handlePageChange('increment')}
                    ><ArrowCircleRightRegular style={{ color: selectedItem === total ? 'grey' : '' }} fontSize={35} /></div>
                </div>
            </div>

            {flag !== 'lookup' && <div style={{ fontSize: '20px', marginRight: '13px' }}>Total Records: {totalCount}</div>}
        </div>
    )
}

"use client"

import { useEffect, useState } from "react";

import {

    tokens,

} from "@fluentui/react-components";
import { ArrowCircleLeftRegular, ArrowCircleRightRegular } from "@fluentui/react-icons";
export default function BAPagination(props: any) {

    const { totalCount, onPageChange } = props
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [pgNo, setPgNo] = useState(1)
    const [totalPage, setTotalPages] = useState<any>([])
    const totalPages: any = Math.ceil(totalCount / pageSize);
    const [selectedItem, setSelectedItem] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);


    const handlePagesClick = (page: any) => {

        onPageChange(page)
        setSelectedItem(page)
    }

    useEffect(() => {
        for (let i = 1; i <= totalPages; i++) {
            totalPage.push(i)
            setTotalPages([...totalPage])
        }
        console.log('here');
        setSelectedItem(totalPage[0])
    }, [totalPages])

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
        <div style={{ backgroundColor: tokens.colorBrandBackground2Pressed, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="w-4/8 h-10 mb-2">
            <div></div>
            <div style={{ display: 'flex ', justifyContent: 'center', alignItems: 'center' }} className="d-flex justify-content-center alignItems-center flex-column">

                <div style={{ display: 'flex', flexDirection: 'row', width: '32px', justifyContent: 'center', alignItems: 'center' }} className={` text-center rounded `}>

                    <div style={{ margin: '3px', cursor: isHovered && selectedItem >= 2? 'pointer' : '' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={selectedItem < 2 ? ()=>{} : () => handlePageChange('decrement')}
                   
                    ><ArrowCircleLeftRegular style={{color:selectedItem < 2?'grey':''}} fontSize={35} /></div>
                    {
                       
                       totalPage?.map((pages: any, i: any) => (
                            <div
                                key={i}
                                style={{ margin: '3px', cursor: isHovered ? 'pointer' : '', color: selectedItem === pages ? tokens.colorPaletteNavyBorderActive : tokens.colorNeutralForeground1 }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={(e: any) => handlePagesClick(pages)
                                }
                            >
                                <p style={{ width: '32px', height: '32px', paddingTop: '4px', borderRadius: '100%', border: `1px solid ${selectedItem === pages ? tokens.colorPaletteNavyBorderActive : tokens.colorNeutralForeground1}  ` }}>{pages}</p>
                            </div>
                        ))
                    }




                    <div
                        style={{ margin: '3px', cursor: isHovered && selectedItem !== totalPages? 'pointer' : '' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={selectedItem === totalPages ? ()=>{} : () => handlePageChange('increment')}
                    ><ArrowCircleRightRegular style={{color:selectedItem === totalPages?'grey':''}} fontSize={35} /></div>
                </div>
            </div>

            <div style={{ fontSize: '20px', marginRight: '20px' }}>Total Records: {totalCount}</div>
        </div>
    )
}
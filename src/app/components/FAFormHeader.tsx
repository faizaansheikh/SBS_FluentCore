"use client"
import { tokens } from "@fluentui/react-components";
import { AddRegular, ArrowCircleLeftFilled, ArrowCircleLeftRegular, ArrowDownloadRegular, CheckmarkRegular, DeleteRegular, DismissSquareMultipleRegular, EditRegular, SaveRegular, ShareRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { goBack } from "../config/helpers";
import './custom.css'

export default function FAFormHeader(props:any) {
    const{title} = props
    const [isHovered, setIsHovered] = useState<any>({
        back: false,
        edit: false,
        share: false,
        add: false,
        del: false,
    });
    const [selected, setSelected] = useState<any>(false)
    const handleMouseEnter = (action: any) => {
        console.log(action);

        setIsHovered({
            ...isHovered,
            [action]: true
        })
    }
    const handleMouseLeave = (action: any) => {
        setIsHovered({
            ...isHovered,
            [action]: false
        })
    };
    const handleActions = (action: any, index: any) => {

        setSelected(index);

    }

    const icons = [
        { action: 'edit', icon: <EditRegular style={{ color: tokens.colorCompoundBrandForeground1, cursor: isHovered.edit ? 'pointer' : '', borderRadius: '100%', padding: '5px' }} fontSize={36} /> },
        { action: 'share', icon: <ShareRegular style={{ color: tokens.colorCompoundBrandForeground1, cursor: isHovered.share ? 'pointer' : '', borderRadius: '100%', padding: '5px' }} fontSize={36} /> },
        { action: 'add', icon: <AddRegular style={{ color: tokens.colorCompoundBrandForeground1, cursor: isHovered.add ? 'pointer' : '', borderRadius: '100%', padding: '5px' }} fontSize={36} /> },
        { action: 'del', icon: <DeleteRegular style={{ color: tokens.colorCompoundBrandForeground1, cursor: isHovered.del ? 'pointer' : '', borderRadius: '100%', padding: '5px' }} fontSize={36} /> },





    ]
    return (
        <div className="d flex justify-between align-center">


            <div className="d flex justify center align-center ml-2 " style={{ cursor: isHovered ? 'pointer' : '' }}>
                <div 
                onMouseEnter={() => handleMouseEnter('back')}
                onMouseLeave={() => handleMouseLeave('back')}
                onClick={()=>goBack()}
                
                >  <ArrowCircleLeftRegular style={{ color: isHovered.back ? 'blue' : '' }} fontSize={35} /></div>
                <div className="mt-1 pl-2 text-lg">{title}</div>
            </div>
            <div className="d flex justify center align-center">
                {icons.map((x: any, i: any) => (
                    <div
                        className='mr-9'
                        onMouseEnter={() => handleMouseEnter(x.action)}
                        onMouseLeave={() => handleMouseLeave(x.action)}
                        onClick={() => handleActions(x.action, i)}
                        style={{
                            borderRadius: '100%',
                            border: selected === i || isHovered[x.action] ? `1px solid ${tokens.colorCompoundBrandForeground1}` : ''
                        }}
                    >

                        {x.icon}
                    </div>
                ))}


            </div>
            <div className="d flex justify center align-center">
                <div className='mr-5 mb-2'>  <CheckmarkRegular fontSize={17} />Saved</div>
                <div className='mr-5'>  <DismissSquareMultipleRegular fontSize={26} /></div>
            </div>
        </div>
    )
}
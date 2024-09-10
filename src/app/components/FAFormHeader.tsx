"use client"
import { tokens, Tooltip } from "@fluentui/react-components";
import { AddRegular, ArrowCircleLeftFilled, ArrowCircleLeftRegular, ArrowDownloadRegular, CheckmarkRegular, DeleteRegular, DismissSquareMultipleRegular, EditRegular, SaveRegular, ShareRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { goBack } from "../config/helpers";
import './custom.css'
import { useParams } from "next/navigation";
import { GeneralCoreService } from "../config/GeneralCoreService";
import { displayError, openDialog } from "../config/MasterContainer";
import { BAButton } from "./BAButton";

export default function FAFormHeader(props?: any) {
    const params = useParams()
    const { title, saveRec, setProperty, property, FormName, module } = props
    const [isHovered, setIsHovered] = useState<any>({
        back: false,
        edit: false,
        share: false,
        Add: false,
        delete: false,
    });

    const handleMouseEnter = (action: any) => {


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

    const deleteDialog = () => {

        openDialog(
            'Confirmation',
            <div>
                Are you sure you want to delete this record?
            </div>,
             <BAButton style={{ backgroundColor: 'red', color: 'white',padding:'10px 20px',marginTop:'10px' }} label='Delete' onClick={handleDelete} />,

        )
       
    }
    const handleDelete = () => {
        setProperty({...property,saveLoading:true})
        GeneralCoreService(FormName,module).DeleteOne(params.id)
        .then((res:any)=>{
            displayError(res.message,'success')
            setProperty({...property,saveLoading:false})
        }).catch((err:any)=>{
            displayError(err.message,'error')
            console.log(err);
            setProperty({...property,saveLoading:false})
        })
    }
    const handleActions = (action: any, index: any) => {

        if ((action === 'Add' && saveRec) || (action === 'edit' && saveRec)) {


            saveRec()
        } else if (action === 'delete') {
            deleteDialog()
        } else { }


    }

    const icons = [
        { action: 'edit', isHide: params.id, icon: <EditRegular style={{ color: tokens.colorCompoundBrandForeground1, cursor: isHovered.edit ? 'pointer' : '', borderRadius: '100%', padding: '5px' }} fontSize={36} /> },
        { action: 'share', isHide: true, icon: <ShareRegular style={{ color: tokens.colorCompoundBrandForeground1, cursor: isHovered.share ? 'pointer' : '', borderRadius: '100%', padding: '5px' }} fontSize={36} /> },
        { action: 'Add', isHide: !params.id, icon: <AddRegular style={{ color: tokens.colorCompoundBrandForeground1, cursor: isHovered.Add ? 'pointer' : '', borderRadius: '100%', padding: '5px' }} fontSize={36} /> },
        { action: 'delete', isHide: params.id && title !== 'Users', icon: <DeleteRegular style={{ color: tokens.colorCompoundBrandForeground1, cursor: isHovered.delete ? 'pointer' : '', borderRadius: '100%', padding: '5px' }} fontSize={36} /> },





    ]
    return (
        <div className="d flex justify-between align-center">


            <div className="d flex justify center align-center ml-2 " style={{ cursor: isHovered ? 'pointer' : '' }}>
                <div
                    onMouseEnter={() => handleMouseEnter('back')}
                    onMouseLeave={() => handleMouseLeave('back')}
                    onClick={() => goBack()}

                >  <ArrowCircleLeftRegular style={{ color: isHovered.back ? 'blue' : '' }} fontSize={35} /></div>
                <div className="mt-1 pl-2 text-lg">{title}</div>
            </div>
            <div className="d flex justify center align-center">
                {icons.map((x: any, i: any) => (
                    x.isHide && <Tooltip
                        appearance="inverted"
                        content={x.action}
                        relationship="label"
                    >


                        <div
                            className='mr-9'
                            onMouseEnter={() => handleMouseEnter(x.action)}
                            onMouseLeave={() => handleMouseLeave(x.action)}
                            onClick={() => handleActions(x.action, i)}
                            style={{
                                borderRadius: '100%',
                                border: isHovered[x.action] ? `1px solid ${tokens.colorCompoundBrandForeground1}` : ''
                            }}
                        >

                            {x.icon}
                        </div>
                    </Tooltip>
                ))}


            </div>
            <div className="d flex justify center align-center">
                {params.id && <div className='mr-5 mb-2'>  <CheckmarkRegular fontSize={17} />Saved</div>}
                <div className='mr-5'>  <DismissSquareMultipleRegular fontSize={26} /></div>
            </div>
        </div>
    )
}
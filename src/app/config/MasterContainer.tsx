"use client";

import { useEffect, useState } from 'react'
import {BADialog} from '../components/BADialog';
// import { BADialog } from '../components/BADialog';
// import BAShowError from '../components/BAShowError'
// import BAModal from '../components/BAModal'
// import BAFullScreenLoader from '../components/BAFullScreenLoader'

type openDialogType = (
   
    title?: string,
    body?: any | null,
    footer?: any | null,
    width?: string,
 
) => void

type displayErrorType = (message: string, severity: 'success' | 'error') => void

export let displayError: displayErrorType
export let openDialog: openDialogType
export let closeDialog: () => void
export let openLoader: () => void
export let closeLoader: () => void


export default function MasterContainer(props: any) {
   
    const { children } = props

    const [openError, setOpenError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>()
    const [severity, setSeverity] = useState<string>()
    const [show1, setShow] = useState<boolean>(false)


    const [openModal, setOpenModal] = useState<boolean>(false)
    const [modalBody, setModalBody] = useState<any>()
    const [modalFooter, setModalFooter] = useState<any>()
    const [modalTitle, setModalTitle] = useState<any>()
    const [modalWidth, setModalWidth] = useState<any>()
    const [onCloseCallback, setOnCloseCallback] = useState<any>(null);


    const [loading, setLoading] = useState(false)


    //#region show Error
    displayError = (message, severityType) => {
        setMessage(message)
        setOpenError(true)
        setSeverity(severityType)
    }
    //#endregion


    //#region Dialog Work
    openDialog = (title = "", body = null, footer = null, width = '60vw') => {
        setOpenModal(true)
        setModalTitle(title)
        setModalBody(body)
        setModalFooter(footer)
        setModalWidth(width ?? '60vw')
        
        // setOnCloseCallback(() => onClose)
    }

    closeDialog = () => {
        setOpenModal(false)
        // onCloseCallback()
    }
    //#endregion

    openLoader = () => {
        setLoading(true)
    }
    closeLoader = () => {
        setLoading(false)
    }



    return <>
        {/* <BAFullScreenLoader open={loading} />
        <BAShowError message={message} type={severity} open={openError} close={(e: boolean) => setOpenError(e)} /> */}
        <BADialog
        open={openModal} 
        setOpen={setOpenModal}
        close={closeDialog} 
        title={modalTitle} 
        body={modalBody} 
        width={modalWidth} 
        footer={modalFooter}
         />

        
        {children}
        
    </>
}
"use client"

import BABox from "@/app/components/BABox";
import { BAButton } from "@/app/components/BAButton";
import { BADialog } from "@/app/components/BADialog";
import BAFormElement from "@/app/components/BAFormElement";
import BAScreenHeader from "@/app/components/BAScreenHeader";
import { ArrowDownloadRegular, SaveRegular } from "@fluentui/react-icons";
import { useState } from "react";

export default function UserForm() {
    const [model, setModel] = useState({
        IsActive: true,
    });
    let formElem = [

        {
            col: 4,
            elementType: "input",
            key: "UserName",
            label: "User Name",
            required: true,
        },
        {
            col: 4,
            elementType: "input",
            key: "Password",
            label: "Password",
            type: "password",
            required: true,
        },
        {
            col: 4,
            elementType: "input",
            key: "Designation",
            label: "Designation",
            required: true,
        },
        
        {
            col: 4,
            elementType: "input",
            key: "Roles",
            label: "Roles",
            required: true,
        },
        {
            col: 4,
            elementType: "input",
            key: "Company",
            label: "Company",
            required: true,
        },
        {
            col: 4,
            elementType: "input",
            key: "Locations",
            label: "Locations",
            required: true,
        },
        
        {
            col: 4,
            elementType: "input",
            key: "DefaultLocations",
            label: "Default Locations",
            required: true,
        },
       
        {
            col: 4,
            elementType: "input",
            key: "Email",
            label: "Email",
            required: true,
        },
        {
            col: 4,
            elementType: "input",
            key: "ContactNo",
            label: "Contact No",
            required: true,
        },
       
        {
            col: 4,
            elementType: "input",
            key: "TransactionType",
            label: "Transaction Type",
            required: true,
        },
        {
            col: 4,
            elementType: "input",
            key: "Segement1",
            label: "Segement 1",
            required: true,
        },
        {
            col: 4,
            elementType: "input",
            key: "Segement2",
            label: "Segement 2",
            required: true,
        },
        {
            col: 4,
            elementType: "input",
            key: "Segement3",
            label: "Segement 3",
            required: true,
        },


    ];
    return <>
        <div>
            <div>
                <BAScreenHeader title={'Users'} headerOptions={[
                    // {
                    //     displayField:() => <BAButton  label={'Download'} />
                    // },
                    {
                       displayField:() => <BAButton style={{fontSize:'18px'}} icon={<SaveRegular  color="blue" fontSize={20}/>} label={'Save'} />
                    }
                ]}/>
            </div>
            <BADialog open={'d'}/>
            <BABox>
                <BAFormElement
                    // disabledForm={!screenRole.Create || !screenRole.Edit}
                    model={model}
                    setModel={setModel}
                    formElements={formElem}
                />
            </BABox>
        </div>
    </>
}


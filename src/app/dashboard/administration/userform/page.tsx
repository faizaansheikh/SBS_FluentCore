"use client"

import BABox from "@/app/components/BABox";

import BAFormElement from "@/app/components/BAFormElement";
import FAFormHeader from "@/app/components/FAFormHeader";
import { roleConfig } from "@/app/config/lookupConfig";

import { useState } from "react";

export default function UserForm() {
    const [model, setModel] = useState({
        IsActive: true,
        Roles:[]
    });
    let formElem = [

        {
            col: 6,
            elementType: "input",
            key: "UserName",
            label: "User Name",
            required: true,
        },
        {
            col: 6,
            elementType: "input",
            key: "Password",
            label: "Password",
            type: "password",
            required: true,
        },
        {
            col: 6,
            elementType: "input",
            key: "Designation",
            label: "Designation",
            required: true,
        },

        {
            col: 6,
            elementType: "lookup",
            key: "Roles",
            label: "Roles",
            module: "Security",
            controller: "Roles",
            valueField: "Id ",
            displayField: "RoleName",
            filterConfig: roleConfig,
            // fillObj: lookupObjs.rolesObj,
            required: true,
            multiple: true,
            onCancel: () => {
              model.Roles = [];
              setModel({ ...model });
            },
            ChangeEv: (ev:any, val:any, obj:any, element:any, index:any) => {
            //   model.Roles = ev;
              setModel({ ...model });
            },
          },
        {
            col: 6,
            elementType: "select",
            key: "Company",
            label: "Company",
            required: true,
        },
        {
            col: 6,
            elementType: "input",
            key: "Locations",
            label: "Locations",
            required: true,
        },

        {
            col: 6,
            elementType: "input",
            key: "DefaultLocations",
            label: "Default Locations",
            required: true,
        },

        {
            col: 6,
            elementType: "input",
            key: "Email",
            label: "Email",
            required: true,
        },
        {
            col: 6,
            elementType: "input",
            key: "ContactNo",
            label: "Contact No",
            required: true,
        },

        {
            col: 6,
            elementType: "input",
            key: "TransactionType",
            label: "Transaction Type",
            required: true,
        },
        {
            col: 6,
            elementType: "input",
            key: "Segement1",
            label: "Segement 1",
            required: true,
        },
        {
            col: 6,
            elementType: "input",
            key: "Segement2",
            label: "Segement 2",
            required: true,
        },
        {
            col: 6,
            elementType: "input",
            key: "Segement3",
            label: "Segement 3",
            required: true,
        },


    ];
    console.log(model);
    
    return <>
        <div>
          
            <div className="mt-3">
                <FAFormHeader title={"Users"}/>
            </div>
            <BABox title='Users' show={'Show less'}>
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


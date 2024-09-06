"use client"

import BABox from "@/app/components/BABox";

import BAFormElement from "@/app/components/BAFormElement";
import BAFormGrid from "@/app/components/BAFormGrid";
import FAFormHeader from "@/app/components/FAFormHeader";
import { companyConfig, locationConfig, roleConfig, segmentConfig } from "@/app/config/lookupConfig";

import { useState } from "react";

export default function UserForm() {
  const [model, setModel] = useState<any>({
    IsActive: true,
    // Roles: []
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
      // onCancel: () => {
      //   model.Roles = [];
      //   setModel({ ...model });
      // },
      ChangeEv: (ev: any, val: any, obj: any, element: any, index: any) => {
        //   model.Roles = ev;
        setModel({ ...model });
      },
    },
    {
      col: 6,
      elementType: "lookup",
      key: "CompName",
      label: "Company",
      module: "Security",
      controller: "Company",
      valueField: "CompName",
      displayField: "CompName",
      filterConfig: companyConfig,
      // disabled: params.id,
      required: true,
      // fillObj: lookupObjs.companyObj,
      // onCancel: () => {
      //   model.CompID = "";
      //   model.CompName = "";
      //   setModel({ ...model });
      // },
      ChangeEv: (ev: any, val: any, obj: any, element: any, index: any) => {
        model.CompID = obj.Id;
        setModel({ ...model });
      },
    },
    {
      col: 6,
      elementType: "lookup",
      key: "Locations",
      label: "Locations",
      module: "Inventory",
      controller: "Locations",
      valueField: "Locations",
      filterConfig: locationConfig,
      // fillObj: lookupObjs.locationObj,
      multiple: true,
      displayField: "Location",
      required: true,
      // onCancel: () => {
      //   model.Locations = [];
      //   setModel({ ...model });
      // },
    },
    {
      col: 6,
      elementType: "lookup",
      key: "DefaultLocationCode",
      label: "Default Location",
      module: "Inventory",
      controller: "Locations",
      valueField: "Location",
      filterConfig: locationConfig,
      displayField: "Location",
      required: true,
      // fillObj: lookupObjs.defaultLocationObj,
      // onCancel: () => {
      //   console.log('d');

      //   model.DefaultLocation = "";
      //   model.DefaultLocationCode = "";
      //   setModel({ ...model });
      // },
      ChangeEv: (ev: any, val: any, obj: any, rowIndex: any) => {
        if (obj) {
          model.DefaultLocation = obj.Location;
          setModel({ ...model });
        }

      },
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
      elementType: "boolean",
      key: "IsActive",
      label: "Is Active",
      required: true,
    },

    {
      col: 6,
      elementType: "select",
      key: "TransactionType",
      label: "Transaction Type",
      required: true,
      options: [
        "View Transaction of All User",
        "View Only his Transaction"

      ]
    },
    {
      col: 6,
      elementType: "lookup",
      key: "Seg1Desc",
      label: "Segment 1",
      module: "Financials",
      controller: "Seg1",
      valueField: "VSDesc",
      displayField: "VSDesc",
      filterConfig: segmentConfig,
      // fillObj: lookupObjs.seg1Obj,
      // isHide: !localStorage.getItem("Segments") === 4,
      // onCancel: () => {
      //   model.Seg1Code = null;
      //   model.Seg1Desc = null;
      //   setModel({ ...model });
      // },
      ChangeEv: (ev: any, val: any, obj: any, rowIndex: any) => {
        model.Seg1Desc = obj.VSDesc;
        model.Seg1Code = obj.VSCode;
        setModel({ ...model });
      },
    },
    {
      col: 6,
      elementType: "lookup",
      key: "Seg2Desc",
      label: "Segment 2",
      module: "Financials",
      controller: "Seg2",
      valueField: "VSDesc",
      displayField: "VSDesc",
      filterConfig: segmentConfig,
      // fillObj: lookupObjs.seg2Obj,
      // isHide: !localStorage.getItem("Segments") >= 3,
      // onCancel: () => {
      //   model.Seg2Code = null;
      //   model.Seg2Desc = null;
      //   setModel({ ...model });
      // },
      ChangeEv: (ev: any, val: any, obj: any, rowIndex: any) => {
        if (obj) {
          // model.Seg2Desc = obj.VSDesc;
          model.Seg2Code = obj.VSCode;
          setModel({ ...model });
        }
      },
    },
    {
      col: 6,
      elementType: "lookup",
      key: "Seg3Desc",
      label: "Segment 3",
      module: "Financials",
      controller: "Seg3",
      valueField: "VSDesc",
      displayField: "VSDesc",
      filterConfig: segmentConfig,
      // fillObj: lookupObjs.seg3Obj,
      // isHide: !localStorage.getItem("Segments") >= 2,
      onCancel: () => {
        model.Seg3Code = null;
        model.Seg3Desc = null;
        setModel({ ...model });
      },
      ChangeEv: (ev: any, val: any, obj: any, rowIndex: any) => {
        model.Seg3Desc = obj.VSDesc;
        model.Seg3Code = obj.VSCode;
        setModel({ ...model });
      },
    },


  ];
  console.log(model);

  return <>
    <div>

      <div className="mt-3">
        <FAFormHeader title={"Users"} />
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


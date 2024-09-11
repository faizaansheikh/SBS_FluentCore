"use client"

import BABox from "@/app/components/BABox";

import BAFormElement from "@/app/components/BAFormElement";
import BAFormGrid from "@/app/components/BAFormGrid";
import FAFormHeader from "@/app/components/FAFormHeader";
import FALoader from "@/app/components/FALoader";
import { checkRequired, goBack } from "@/app/config/helpers";
import { companyConfig, locationConfig, roleConfig, segmentConfig } from "@/app/config/lookupConfig";
import { displayError } from "@/app/config/MasterContainer";
import { UserService } from "@/app/services/ScreenServices";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function TaxDetailForm() {
  const params = useParams()
  const [model, setModel] = useState<any>({
    IsActive: true,
    // Roles: []
  });
  const [property, setProperty] = useState({
    screenLoading: false,
    loading: false,
    saveLoading: false,
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
      key: "Roles1",
      label: "Roles",
      module: "Security",
      controller: "Roles",
      valueField: "Id ",
      displayField: "RoleName",
      filterConfig: roleConfig,
      fillObj: params.id ? 'Roles' : '',
      // required: true,
      multiple: true,
      // onCancel: () => {
      //   model.Roles = [];
      //   setModel({ ...model });
      // },
      ChangeEv: (ev: any, val: any, obj: any, element: any, index: any) => {
        if(obj){
          setModel({ ...model ,Roles:obj});
        }
    
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
        model.CompID = obj?.Id;
        setModel({ ...model });
      },
    },
    {
      col: 6,
      elementType: "lookup",
      key: "Locations1",
      label: "Locations",
      module: "Inventory",
      controller: "Locations",
      valueField: "Locations",
      filterConfig: locationConfig,
      // fillObj: lookupObjs.locationObj,
      multiple: true,
      displayField: "Location",
      // required: true,
      // onCancel: () => {
      //   model.Locations = [];
      //   setModel({ ...model });
      // },
      ChangeEv: (ev: any, val: any, obj: any, element: any, index: any) => {
        if (obj) {
          setModel({ ...model,Locations:obj });
        }
       
      },
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
        
          setModel({ ...model ,DefaultLocation:val,DefaultLocationCode:obj.LocationCode});
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
        model.Seg1Desc = obj?.VSDesc;
        model.Seg1Code = obj?.VSCode;
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
          model.Seg2Code = obj?.VSCode;
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
        model.Seg3Desc = obj?.VSDesc;
        model.Seg3Code = obj?.VSCode;
        setModel({ ...model });
      },
    },


  ];

  const save = () => {

   const{Roles1,Locations1,...updated} = model

   
    if (checkRequired(formElem, updated)) {
      setProperty({ ...property, saveLoading: true });
      UserService.Save({ ...updated }, updated.Id)
        .then((res: any) => {
          setProperty({ ...property, saveLoading: false });
          displayError(res.message, "success");
          goBack();
        })
        .catch((err: any) => {
          setProperty({ ...property, saveLoading: false });
          displayError(err.message, "error");
        });
    }
    
  };

  const getDataById = (id:any) => {
    setProperty({ ...property, saveLoading: true });
    UserService.GetOne(id)
      .then((res:any) => {
 
      
        setModel({
           ...res.data,
           Roles1:res.data.Roles.map((r:any)=>r.RoleName).join(','),
           Locations1:res.data.Locations.map((l:any)=>l.Location).join(',')
         });
        setProperty({ ...property, saveLoading: false });
      })
      .catch((err) => {
        setProperty({ ...property, saveLoading: false });
      });
  };
  useEffect(() => {
    // setScreenRole(checkRole(Id));
    if (params.id) {
      getDataById(params.id);
    }
  }, []);

  return <>
    <div>

      <div className="mt-3">
        <FAFormHeader 
          title={"Users"} 
          saveRec={save} 
       
          
          />
      </div>
      <BABox title='Users' show={'Show less'}>
        {property.saveLoading ? <FALoader /> : 
        <BAFormElement
          // disabledForm={!screenRole.Create || !screenRole.Edit}
          model={model}
          setModel={setModel}
          formElements={formElem}
        />}
      </BABox>



    </div>
  </>
}


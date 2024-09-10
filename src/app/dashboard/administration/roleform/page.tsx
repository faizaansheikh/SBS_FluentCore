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
import { Checkbox, MenuItem, MenuList, tokens } from "@fluentui/react-components";
import { useParams } from "next/navigation";

import { useEffect, useLayoutEffect, useState } from "react";
import { jsonData } from "../../appMenu";
import { BACheckBox } from "@/app/components/BACheckBox";

export default function RoleForm() {
    const module = jsonData()
    console.log(module)
    const params = useParams()
    const [formRoles, setFormRoles] = useState<any>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [fetchedRights, setFetchedRights] = useState<any>([]);
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
            col: 8,
            elementType: "input",
            required: true,
            key: "RoleName",
            label: "Role Name",
        },
        {
            col: 4,
            elementType: "boolean",
            required: true,
            key: "IsActive",
            label: "Is Active",
        },




    ];

    const save = () => {

        const { Roles1, Locations1, ...updated } = model


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

    const getDataById = (id: any) => {
        setProperty({ ...property, saveLoading: true });
        UserService.GetOne(id)
            .then((res: any) => {


                setModel({
                    ...res.data,
                    Roles1: res.data.Roles.map((r: any) => r.RoleName).join(','),
                    Locations1: res.data.Locations.map((l: any) => l.Location).join(',')
                });
                setProperty({ ...property, saveLoading: false });
            })
            .catch((err) => {
                setProperty({ ...property, saveLoading: false });
            });
    };
    const updateSingleCheckbox = (index: any, right: any, value: any) => {
        if (index >= 0 && index < formRoles.length) {
            // Create new array copies
            const updatedFormRoles: any = [...formRoles];
            const updatedFetchedRights: any = [...fetchedRights];

            const updatedRole = { ...updatedFormRoles[index], [right]: value };
            updatedFormRoles[index] = updatedRole; // Update formRoles entry

            const indexInFetchedRights = updatedFetchedRights.findIndex(
                (x: any) => x.ControlID === updatedRole.ControlID
            );

            if (indexInFetchedRights > -1) {
                // Update the entry in fetchedRights
                updatedFetchedRights[indexInFetchedRights] = {
                    ...updatedFetchedRights[indexInFetchedRights],
                    [right]: value,
                };
            } else {
                // Add a new entry to fetchedRights if not present
                updatedFetchedRights.push(updatedRole);
            }

            // Set both updated states
            setFormRoles(updatedFormRoles);
            setFetchedRights(updatedFetchedRights);
        } else {
            console.error("Index out of bounds");
        }
    };
    const handleRights = (right: any) => {
        const areAllChecked = formRoles.every((el: any) => el[right] === true);
        const newValue = !areAllChecked;

        const updatedRoles = formRoles.map((role: any) => {
            // Copy role and toggle the right
            const updatedRole: any = { ...role, [right]: newValue };

            // Find index in fetchedRights
            const indexInFetchedRights = fetchedRights.findIndex(
                (e: any) => e.ControlID === role.ControlID
            );

            if (indexInFetchedRights > -1) {
                // If found, update the specific right
                fetchedRights[indexInFetchedRights] = {
                    ...fetchedRights[indexInFetchedRights],
                    [right]: newValue,
                };
            } else {
                // If not found, add the role to fetchedRights
                fetchedRights.push(updatedRole);
            }

            return updatedRole;
        });

        // Update both formRoles and fetchedRights with new data
        setFormRoles([...updatedRoles]);
        setFetchedRights([...fetchedRights]);
    };

    const isAllChecked = (right: any) => {
        console.log(formRoles.map((el: any) => el[right]))
        return formRoles.filter((el: any) => el[right] === true).length ===
            formRoles.length
            ? true
            : false;
    };
    const handleList = (x: any, index: any) => {
        
        setProperty({ ...property, loading: true });
        const updatedFetchedRights = [...fetchedRights];
        
        x.forEach((el:any,i:any)=>(
            updatedFetchedRights.map((fr:any)=>{
                if(el.ControlID === fr.ControlID){
                    // console.log(x,i,fr);
                    x[i] = fr
                }
            })
        ))
        console.log(x);
        
        // x.forEach((el: any) => {
        //     const i = updatedFetchedRights.findIndex(
        //         (e) => e.ControlID === el.ControlID
        //     );

            // console.log(x)
            // if (i > -1) {
            //     el.Create = updatedFetchedRights[i].Create;
            //     el.View = updatedFetchedRights[i].View;
            //     el.Edit = updatedFetchedRights[i].Edit;
            //     el.Delete = updatedFetchedRights[i].Delete;
            //     el.Approval = updatedFetchedRights[i].Approval;
            //     el.Post = updatedFetchedRights[i].Post;
            // } else {
            //     el.Create = false;
            //     el.View = false;
            //     el.Edit = false;
            //     el.Delete = false;
            //     el.Approval = false;
            //     el.Post = false;
            // }
        // });
        setTimeout(() => {
              setProperty({ ...property, loading: false });
        }, 500);
        setFormRoles(x);
        setSelectedIndex(index);
    };
   
    
    useEffect(() => {
        // setScreenRole(checkRole(Id));
        const moduleName = Object.keys(module)[0];
        if (moduleName) {
            handleList(module[moduleName], 0);
        }
        if (params.id) {
            getDataById(params.id);
        }
    }, []);
    // useLayoutEffect(() => {
    //     const moduleName = Object.keys(module)[selectedIndex];
    //     if (moduleName) {
    //         handleList(module[moduleName], selectedIndex);
    //     }
    // }, [selectedIndex, fetchedRights]);
    console.log(formRoles)
    return <>
        <div>

            <div className="mt-3">
                <FAFormHeader
                    title={"Roles"}
                    saveRec={save}


                />
            </div>
            <BABox title='Roles' show={'Show less'}>
                {property.saveLoading ? <FALoader /> :
                    <BAFormElement
                        // disabledForm={!screenRole.Create || !screenRole.Edit}
                        model={model}
                        setModel={setModel}
                        formElements={formElem}
                    />}
            </BABox>

            <BABox title='Details' show={'Show less'}>
                {property.saveLoading ? <FALoader /> :
                    <div className="grid"  >
                        <div className="col-2_sm-12">
                            <MenuList>
                                {Object.keys(module).map((x: any, i: any) => (
                                    <MenuItem
                                        key={i}
                                        style={{ fontSize: '14px', padding: '10px 0px 10px 10px', marginBottom: '10px', backgroundColor: selectedIndex === i ? tokens.colorNeutralBackground3Pressed : '' }}
                                        onClick={() => {
                                            handleList(module[x], i);
                                        }}
                                    >{x}</MenuItem>
                                ))}


                            </MenuList>
                        </div>
                        <div className="col-10_sm-12">
                            {property.loading?<FALoader/>:<BAFormGrid
                                roles={true}
                                disabledAddRow={true}
                                setDatasource={(arr: any) =>  setFormRoles([...arr])}
                                datasource={formRoles}
                                gridCols={[
                                    {
                                        key: "ControlName",
                                        label: "Control Name",
                                        width: '160px',
                                        element: {
                                            col: 12,
                                            elementType: "input",
                                            key: "ControlName",
                                            readOnly: true,
                                            label: "",
                                        },
                                    },
                                    {
                                        key: "ControlType",
                                        label: "Control Type",
                                        width: '130px',
                                        element: {
                                            col: 12,
                                            elementType: "input",
                                            key: "ControlType",
                                            readOnly: true,
                                            label: "",

                                        },
                                    },
                                    // {
                                    //   key: 'rowSelect',

                                    // }
                                    {
                                        key: "Create",
                                        label: "Create",
                                        width: '70px',
                                        headerField: () => (
                                            <div
                                                style={{
                                                    textWrap: "nowrap",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                Create
{/*     
                                                <BACheckBox
                                                    // checked={isAllChecked("Create")}
                                                    checked={true}

                                                    onChange={() => handleRights("Create")}
                                                /> */}
                                               
                                            </div>
                                        ),
                                        displayField:(el:any,i:any)=>
                                           
                                            {
                                           return <BACheckBox
                                            // checked={isAllChecked("Create")}
                                            checked={el['Create']}

                                            onChange={(e:any) => {
                                               
                                                updateSingleCheckbox(i, "Create", e.target.checked)
                                            }}
                                        />
                                        },
                                        // element: {
                                        //     col: 12,
                                        //     elementType: "checkbox",
                                        //     key: "Create",
                                        //     label: "",
                                        //     ChangeEv: (e: any, val: any, elem: any, index: any) => {
                                               
                                        //         updateSingleCheckbox(index, "Create", val);
                                        //         // handleRights("Create");
                                        //     },
                                        // },
                                    },
                                    {
                                        key: "View",
                                        label: "View",
                                        width: '70px',
                                        headerField: () => (
                                            <div
                                                style={{
                                                    textWrap: "nowrap",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <BACheckBox
                                                    checked={isAllChecked("View")}
                                                    onChange={() => handleRights("View")}
                                                />
                                                
                                            </div>
                                        ),
                                        element: {
                                            col: 12,
                                            elementType: "checkbox",
                                            key: "View",
                                            label: "",
                                            ChangeEv: (e: any, val: any, elem: any, index: any) => {
                                                updateSingleCheckbox(index, "View", val);
                                            },
                                        },
                                    },
                                    {
                                        key: "Edit",
                                        label: "Edit",
                                        width: '70px',
                                        headerField: () => (
                                            <div
                                                style={{
                                                    textWrap: "nowrap",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <BACheckBox
                                                    checked={isAllChecked("Edit")}
                                                    onChange={() => handleRights("Edit")}
                                                />
                                                
                                            </div>
                                        ),
                                        element: {
                                            col: 12,
                                            elementType: "checkbox",
                                            key: "Edit",
                                            label: "",
                                            ChangeEv: (e: any, val: any, elem: any, index: any) => {
                                                updateSingleCheckbox(index, "Edit", val);
                                            },
                                        },
                                    },
                                    {
                                        key: "Delete",
                                        label: "Delete",
                                        width: '70px',
                                        headerField: () => (
                                            <div
                                                style={{
                                                    textWrap: "nowrap",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <BACheckBox
                                                    checked={isAllChecked("Delete")}
                                                    onChange={() => handleRights("Delete")}
                                                />
                                                
                                            </div>
                                        ),
                                        element: {
                                            col: 12,
                                            elementType: "checkbox",
                                            key: "Delete",
                                            label: "",
                                            ChangeEv: (e: any, val: any, elem: any, index: any) => {
                                                updateSingleCheckbox(index, "Delete", val);
                                            },
                                        },
                                    },
                                    {
                                        key: "Approval",
                                        label: "Approval",
                                        width: '70px',
                                        headerField: () => (
                                            <div
                                                style={{
                                                    textWrap: "nowrap",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <BACheckBox
                                                    checked={isAllChecked("Approval")}
                                                    onChange={() => handleRights("Approval")}
                                                />
                                                
                                            </div>
                                        ),
                                        element: {
                                            col: 12,
                                            elementType: "checkbox",
                                            key: "Approval",
                                            label: "",
                                            ChangeEv: (e: any, val: any, elem: any, index: any) => {
                                                updateSingleCheckbox(index, "Approval", val);
                                            },
                                        },
                                    },
                                    {
                                        key: "Post",
                                        label: "Post",
                                        width: '70px',
                                        headerField: () => (
                                            <div
                                                style={{
                                                    textWrap: "nowrap",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <BACheckBox
                                                    checked={isAllChecked("Post")}
                                                    onChange={() => handleRights("Post")}
                                                />
                                                
                                            </div>
                                        ),
                                        element: {
                                            col: 12,
                                            elementType: "checkbox",
                                            key: "Post",
                                            label: "",
                                            ChangeEv: (e: any, val: any, elem: any, index: any) => {
                                                updateSingleCheckbox(index, "Post", val);
                                            },
                                        },
                                    },
                                ]}
                            />}
                            
                        </div>
                    </div>

                }
            </BABox>



        </div>
    </>
}


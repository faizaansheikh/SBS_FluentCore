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
import { RolesService } from "@/app/config/ScreenServices";

export default function RoleForm() {
    const module = jsonData()
   
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
        const filteredList = fetchedRights.filter(
          (el:any) =>
            el.Create === true ||
            el.View === true ||
            el.Edit === true ||
            el.Delete === true ||
            el.Approval === true ||
            el.Post === true
        );
    
        const removeRid = filteredList.map((el:any) => {
          delete el.RID;
          return el;
        });
    
        const payload = {
          Header: { ...model },
          Details: [...removeRid],
        };
    
        if (checkRequired(formElem, model)) {
          if (filteredList.length > 0) {
            setProperty({ ...property, saveLoading: true });
            RolesService.Save(payload, model.rowID)
              .then((res:any) => {
                setProperty({ ...property, saveLoading: false });
                displayError(res.message, "success");
                goBack();
              })
              .catch((err) => {
                setProperty({ ...property, saveLoading: false });
                displayError(err.message, "error");
              });
          } else {
            displayError("Please select at least one Role Detail",'error');
          }
        }
      };

    const getDataById = (id: any) => {
        setProperty({ ...property, loading: true });
        RolesService.GetOne(id)
            .then((res: any) => {
                const { Header, Details } = res.data;
                setModel({ ...Header });
                setFetchedRights([...Details]);
                setProperty({ ...property, loading: false });
            })
            .catch((error) => {
                displayError(error.message, 'error');
                setProperty({ ...property, loading: false });
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

        x.forEach((el: any, i: any) => (
            updatedFetchedRights.map((fr: any) => {
                if (el.ControlID === fr.ControlID) {
                    // console.log(x,i,fr);
                    x[i] = fr
                }
            })
        ))


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
                            {property.loading ? <FALoader /> : <BAFormGrid
                                roles={true}
                                disabledAddRow={true}
                                setDatasource={(arr: any) => setFormRoles([...arr])}
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
                                        displayField: (el: any, i: any) => {
                                            return <BACheckBox
                                                // checked={isAllChecked("Create")}
                                                checked={el['Create']}

                                                onChange={(e: any) => {

                                                    updateSingleCheckbox(i, "Create", e.target.checked)
                                                }}
                                            />
                                        },

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
                                                View


                                            </div>
                                        ),
                                        displayField: (el: any, i: any) => {
                                            return <BACheckBox

                                                checked={el['View']}

                                                onChange={(e: any) => {

                                                    updateSingleCheckbox(i, "View", e.target.checked)
                                                }}
                                            />
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
                                                Edit


                                            </div>
                                        ),
                                        displayField: (el: any, i: any) => {
                                            return <BACheckBox

                                                checked={el['Edit']}

                                                onChange={(e: any) => {

                                                    updateSingleCheckbox(i, "Edit", e.target.checked)
                                                }}
                                            />
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
                                                Delete


                                            </div>
                                        ),
                                        displayField: (el: any, i: any) => {
                                            return <BACheckBox

                                                checked={el['Delete']}

                                                onChange={(e: any) => {

                                                    updateSingleCheckbox(i, "Delete", e.target.checked)
                                                }}
                                            />
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
                                                Approval


                                            </div>
                                        ),
                                        displayField: (el: any, i: any) => {
                                            return <BACheckBox

                                                checked={el['Approval']}

                                                onChange={(e: any) => {

                                                    updateSingleCheckbox(i, "Approval", e.target.checked)
                                                }}
                                            />
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
                                                Post


                                            </div>
                                        ),
                                        displayField: (el: any, i: any) => {
                                            return <BACheckBox

                                                checked={el['Post']}

                                                onChange={(e: any) => {

                                                    updateSingleCheckbox(i, "Post", e.target.checked)
                                                }}
                                            />
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


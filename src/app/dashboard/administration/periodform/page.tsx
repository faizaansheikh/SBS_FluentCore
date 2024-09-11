"use client"

import BABox from "@/app/components/BABox";

import BAFormElement from "@/app/components/BAFormElement";
import BAFormGrid from "@/app/components/BAFormGrid";
import FAFormHeader from "@/app/components/FAFormHeader";
import FALoader from "@/app/components/FALoader";
import { checkRequired, formattedDate, goBack } from "@/app/config/helpers";
import { companyConfig, locationConfig, roleConfig, segmentConfig } from "@/app/config/lookupConfig";
import { displayError } from "@/app/config/MasterContainer";
import { UserService } from "@/app/services/ScreenServices";
import { Checkbox, MenuItem, MenuList, tokens } from "@fluentui/react-components";
import { useParams } from "next/navigation";

import { useEffect, useLayoutEffect, useState } from "react";
import { jsonData } from "../../appMenu";
import { BACheckBox } from "@/app/components/BACheckBox";
import { PeriodService, RolesService } from "@/app/config/ScreenServices";
import moment from "moment";
import { format, subDays, subMonths } from "date-fns";
import { BASwitch } from "@/app/components/BASwitch";

export default function PeriodForm() {
 
    const params = useParams()
    const [formRoles, setFormRoles] = useState<any>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [fetchedRights, setFetchedRights] = useState<any>([]);
    const [EndDate, setEndDate] = useState<any>('');
    const [periodsList, setPeriodsList] = useState<any>([]);
    const [model, setModel] = useState<any>({
        IsActive: true,
        StartDate: new Date().toISOString().split('T')[0],
        Closed:false
    });
 
    const [property, setProperty] = useState({
        screenLoading: false,
        loading: false,
        saveLoading: false,
    });
    const getLastDayOfMonth = (date:any) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
      };
    let formElem = [
        {
            col: 6,
            elementType: "input",
            type:'number',
            required: true,
            key: "YearID",
            label: "Year ID",
        },
        {
            col: 6,
            elementType: "input",
            required: true,
            type:'date',
            key: "StartDate",
            label: "Start Date",
            ChangeEv:(ev:any,val:any)=>{
                let months :any = ['','Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec']
            let dt = new Date(new Date(val).getFullYear(), new Date(val).getMonth(), 1);
            dt.setFullYear(dt.getFullYear() + 1);
            dt.setDate(dt.getDate() - 1);
            setModel({
                ...model,
                EndDate:format(dt,'yyyy-MM-dd')
            })
          
            }
        },
       
        {
            col: 6,
            elementType: "textarea",
            label: "End Date",
            body:<h1>{model.EndDate === '' ? '--' : model.EndDate}</h1>
        },

        {
            col: 6,
            key:'Closed',
            elementType: "boolean",
            label: "Close Year",
            ChangeEv: (ev:any, val:any) => {
                periodsList.forEach((x:any) => {
                  x.Financial = !val;
                  x.Purchases = !val;
                  x.Sales = !val;
                  x.Inventory = !val;
                  x.Manufacturing = !val;
                });
                setProperty({ ...property, loading: true });
                setTimeout(() => {
                  setPeriodsList([...periodsList]);
                  setProperty({ ...property, loading: false });
                }, 100);
              },
        },
        {
            col: 6,
            elementType: "button",
            label: "Generate Period",
            style:{backgroundColor:tokens.colorBrandBackground,color:'whitesmoke'},
            onClick:()=>{
                if (model.StartDate && model.EndDate) {
                    let detailArr:any[] = [];
                    let months = [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ];
                    for (let i = 0; i < 12; i++) {
                      detailArr.push({
                        Period:
                          months[
                            new Date(
                              new Date(model.StartDate).setMonth(
                                new Date(model.StartDate).getMonth() + i
                              )
                            ).getMonth()
                          ] +
                          "-" +
                          new Date(
                            new Date(model.StartDate).setMonth(
                              new Date(model.StartDate).getMonth() + i
                            )
                          ).getFullYear(),
                        Financial: true,
                        Purchases: true,
                        Sales: true,
                        Inventory: true,
                        Manufacturing: true,
                        StartDate: JSON.parse(
                          JSON.stringify(
                            new Date(
                              new Date(model.StartDate).setMonth(
                                new Date(model.StartDate).getMonth() + i
                              )
                            )
                          )
                        ),
                        EndDate: JSON.parse(
                          JSON.stringify(
                            getLastDayOfMonth(
                              new Date(
                                new Date(model.StartDate).setMonth(
                                  new Date(model.StartDate).getMonth() + i
                                )
                              )
                            )
                          )
                        ),
                        YearID: model.YearID,
                      });
                    }
                    setPeriodsList([...detailArr]);
                  } else {
                    displayError("Start Date and End Date is Required", "error");
                  }
            }
        },
        



    ];

    const save = () => {
        setProperty({ ...property, saveLoading: true });
    
        if (checkRequired(formElem, model)) {
          PeriodService.Save(
            {
              Header: model,
              Details: [...periodsList],
            },
            model.rowID
          )
            .then((res:any) => {
              setProperty({ ...property, saveLoading: false });
              displayError(res.message, "success");
              goBack();
            })
            .catch((err) => {
              setProperty({ ...property, saveLoading: false });
              displayError(err.message, "error");
            });
        }
      };

      const getDataById = (id:any, IsValidate:any) => {
        setProperty({ ...property, loading: true });
        PeriodService.GetOne(id)
          .then((res:any) => {
            if (IsValidate && res?.data) {
              displayError("Periods already generated for this year.", "error");
              return;
            }
            setModel({ ...res.data.Header });
            setPeriodsList([...res.data.Details]);
            setProperty({ ...property, loading: false });
          })
          .catch((err) => {
            setProperty({ ...property, loading: false });
            displayError(err.message, "error");
          });
      };;
   
  

    
    useEffect(() => {
        
       
        if (params.id) {
            getDataById(params.id,false);
        }
    }, []);

 
    return <>
        <div>

            <div className="mt-3">
                <FAFormHeader
                    title={"Period"}
                    saveRec={save}


                />
            </div>
            <BABox title='Period' show={'Show less'}>
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
                    
                    
                           
                        <div>
                            {property.loading ? <FALoader /> : <BAFormGrid
                                height={periodsList.length === 0 ? '20px' :'400px'}
                                roles={true}
                                disabledAddRow={true}
                                setDatasource={(arr: any) => setPeriodsList([...arr])}
                                datasource={periodsList}
                                gridCols={[
                                    {
                                      key: "Period",
                                      label: "Period",
                                    },
                                    {
                                      key: "StartDate",
                                      label: "Start Date",
                                      displayField: (el:any) => (
                                        <div>{format(el.StartDate, 'yyyy-MM-dd')}</div>
                                      ),
                                    },
                                    {
                                      key: "EndDate",
                                      label: "End Date",
                                      displayField: (el:any) => (
                                        <div>{format(el.EndDate, 'yyyy-MM-dd')}</div>
                                      ),
                                    },
                                    {
                                      key: "Financial",
                                      label: "Financial",
                                        displayField: (el:any) => (
                                        <BASwitch
                                        detail={true}
                                          value={el.Financial}
                                          onChange={(e:any) => {
                                            
                                            el.Financial = e.target.checked;
                                            setPeriodsList([...periodsList]);
                                          }}
                                        />
                                      ),
                                    },
                                    {
                                      key: "Purchases",
                                      label: "Purchases",
                                        displayField: (el:any) => (
                                        <BASwitch
                                        detail={true}
                                          value={el.Purchases}
                                          onChange={(e:any) => {
                                            el.Purchases = e.target.checked;
                                            setPeriodsList([...periodsList]);
                                          }}
                                        />
                                      ),
                                    },
                                    {
                                      key: "Sales",
                                      label: "Sales",
                                        displayField: (el:any) => (
                                        <BASwitch
                                         detail={true}
                                          value={el.Sales}
                                          onChange={(e:any) => {
                                            el.Sales = e.target.checked;
                                            setPeriodsList([...periodsList]);
                                          }}
                                        />
                                      ),
                                    },
                                    {
                                      key: "Inventory",
                                      label: "Inventory",
                                        displayField: (el:any) => (
                                        <BASwitch
                                         detail={true}
                                          value={el.Inventory}
                                          onChange={(e:any) => {
                                            el.Inventory = e.target.checked;
                                            setPeriodsList([...periodsList]);
                                          }}
                                        />
                                      ),
                                    },
                                    {
                                      key: "Manufacturing",
                                      label: "Manufacturing",
                                        displayField: (el:any) => (
                                        <BASwitch
                                         detail={true}
                                          value={el.Manufacturing}
                                          onChange={(e:any) => {
                                            el.Manufacturing = e.target.checked;
                                            setPeriodsList([...periodsList]);
                                          }}
                                        />
                                      ),
                                    },
                                  ]}
                            />}

                        </div>
                   

                }
            </BABox>



        </div>
    </>
}


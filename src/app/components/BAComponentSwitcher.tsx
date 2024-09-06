"use client"

import { BAInput } from "./BAInput";
import {BASearchLookup} from "./BASearchLookup";
import { BASelect } from "./BASelect";
import { BASwitch } from "./BASwitch";



type propsType = {
    model: any,
    setModel: any,
    element: formElement,
    disabledForm?: boolean,
    rowChangeEv?: any,
    rowIndex?: number,
    view?: any,
    detail?:any
}

export default function BAComponentSwitcher(props: propsType) {
    const { model, setModel, element, disabledForm, rowChangeEv, rowIndex, view,detail } = props;
   
    

    const fillModel = (key: any, val: any) => {
        model[key] = val;
        setModel({ ...model });
    };



 
    
    switch (element.elementType) {
        case "input":
            return <BAInput
          
                type={element.type}
                detail={detail}
                value={model[element.key] !== undefined ? model[element.key] : ''}
                onChange={(ev: any) => {

                    setModel({
                        ...model,
                        [element.key]: ev.target.value
                    })
                    if (rowChangeEv) {
                        rowChangeEv(ev, (element.type == 'number' ? Number(ev.target.value) : ev.target.value), element, rowIndex)
                    }

                }}

                disabled={disabledForm || element.disabled}
                required={element.required}
                label={element.label}
               
            />
        // case "passwordinput":
        //     return <BAPasswordInput
        //         value={model[element.key]}
        //         onChange={(e: any) => setModel({ ...model, [element.key]: e.target.value })}
        //         placeholder={element.placeholder}
        //         disabled={disabledForm || element.disabled}
        //         required={element.required}
        //         label={element.label}
        //     />
        // case "button":
        //     return <BAButton
        //         onClick={element.onClick}
        //         disabled={disabledForm || element.disabled}
        //         label={element.label}
        //         loading={element.loading}
        //     />
        case "select":
            return <BASelect
            detail={detail}
                multiple={element.multiple}
                disabled={disabledForm || element.disabled}
                label={element.label}

                options={element.options ?? []}
                value={model[element.key]}
                onChange={(e: any, val: any, obj: any) => {
                   
                    
                    setModel({ ...model, [element.key]: e.target.value })
                    if(element.ChangeEv){
                        element.ChangeEv(e.target.value,val,obj)
                    }
                }}
            />
        case "lookup":
            return <BASearchLookup
                label={element.label}
                module={element.module}
                detail={detail}
                controller={element.controller}
                filterConfig={element.filterConfig}
                displayField={element.displayField || ""}
                value={model[element.key] !== undefined ? model[element.key] : ''}
                multiple={element.multiple}
                singleValue={element.singleValue || ""}
                fillObj={element.fillObj || ""}
                setModel={setModel}
                model={model}
                style={view === 'grid' ? { borderRadius: '0' } : { padding: '13px 12px 4px 11px',height:'auto' }}
                view={view}
                onCancel={() => {
                    if (element.onCancel) {
                      element.onCancel(rowIndex);
                    }
                  }}
                onChange={(e:any,val: any, obj: any) => {
                   console.log(val);
                   
                    
                    if (val !==  undefined) {
                        fillModel(element.key, val)
                        if (element.ChangeEv) {
                            

                            element.ChangeEv(null, val, obj);
                        }
                    }
                    else if(e !== null){
                        fillModel(element.key, e.target.value)
                        if (element.ChangeEv) {
                            

                            element.ChangeEv(null, e.target.value, obj);
                        }
                       
                    }
                    else{
                        console.log('hfwjn')
                        fillModel(element.key, '')
                        if (element.ChangeEv) {
                            

                            element.ChangeEv(null, '', obj);
                        }
                    }

                    

                }}
            />
        // case "date":
        //     return (
        //         <BADate
        //             required={element.required}
        //             disabled={element.disabled}
        //             label={element.label}

        //             value={model[element.key]}
        //             onChange={(date: any, dateString: any) => {
        //                 setModel({ ...model, [element.key]: dateString });
        //             }}
        //         />
        //     )
        case "boolean":
            return (


                <BASwitch
                    required={element.required}
                    disabled={element.disabled}
                    label={element.label}
                    // value={model && model[element.key] ? model[element.key] : null}
                    value={model[element.key] !== undefined ? model[element.key] : false}
                    onChange={(e: any) => {
                        
                        setModel({ ...model, [element.key]: e.target.checked })
                        
                    }
                    }

               
                />
            );
        default:
            return null;
    }

}

export type formElement = {
    col: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10 | 10.5 | 11 | 11.5 | 12,
    elementType: "input" | "datepicker" | "select" | "radio" | "date" | "lookup" | "checkbox" | "boolean" | "textarea" | "passwordinput" | "button",
    key: string,
    label: string,
    placeholder?: string,
    options?: { value: any, label: string, disabled?: boolean }[],
    required?: boolean,
    multiple?: boolean,
    disabled?: boolean,
    loading?: boolean,
    onClick?: any,
    controller?: any,
    type?: any,
    filterConfig?: any,
    displayField?: any,
    ChangeEv?: any,
    singleValue?: any,
    fillObj?: any,
    updateVal?: any,
    module?:any,
    onCancel?:any,
    detail?:any
}
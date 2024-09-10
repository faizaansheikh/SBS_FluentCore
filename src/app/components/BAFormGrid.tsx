"use client"

import { AppsAddInRegular, AppsListRegular, DeleteLinesRegular, MultiselectLtrRegular, SelectAllOnRegular } from "@fluentui/react-icons"
import { BAButton } from "./BAButton"
import { Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, tokens } from "@fluentui/react-components"
import { useEffect, useState } from "react"
import BAComponentSwitcher from "./BAComponentSwitcher"
import './custom.css'
export default function BAFormGrid(props: any) {
    const { gridCols, datasource, setDatasource, disabledAddRow, roles } = props
    // const [datasource, setDatasource] = useState<any>([{}])

    const [rowObj, setRowObj] = useState({});
    const [isSelect, setIsSelect] = useState(null);
    const addRow = () => {
        // if (onAddRow) {
        //   datasource.push(onAddRow());
        //   datasource.forEach((x, i) => {
        //     x.rowIndex = i;
        //   });
        // } else {
        //   datasource.push({});
        // }
        datasource.push({});
        setRowObj({ ...rowObj });
    };
    const deleteRow = () => {


        if (isSelect !== null) {
            datasource.splice(isSelect, 1)
            setDatasource([...datasource])
            setIsSelect(null)
        }
    };

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className="d flex justify-between align-center border-2  border-b-black border-t-black">
                <div>
                    {!roles && <div className="d flex justify-between align-center p-2">
                        <BAButton onClick={addRow} style={{ fontSize: '17px' }} icon={<AppsAddInRegular color={tokens.colorCompoundBrandForeground1} fontSize={36} />} label={'New Line'} />
                        <BAButton onClick={deleteRow} style={{ fontSize: '17px' }} icon={<DeleteLinesRegular color={tokens.colorCompoundBrandForeground1} fontSize={36} />} label={'Delete Line'} />
                        <BAButton style={{ fontSize: '17px' }} icon={<MultiselectLtrRegular color={tokens.colorCompoundBrandForeground1} fontSize={36} />} label={'Selected Items'} />
                    </div>}

                    <div></div>
                    <div></div>
                </div>
                <div></div>
            </div>
            {/* Header */}
            <div style={{ overflowX: 'scroll', overflowY: 'scroll', width: '100%', height: '300px' }}>
                <Table
                    // {...keyboardNavAttr}
                    role="grid"
                    aria-label="Table with grid keyboard navigation"
                    style={{ minWidth: "100%", marginTop: '10px', backgroundColor: tokens.colorNeutralBackground1Selected, tableLayout: 'fixed' }}
                >

                    <TableHeader>

                        <TableRow style={{ backgroundColor: tokens.colorNeutralBackground1Selected, zIndex: 1000, height: '20px', position: 'sticky', top: 0, right: 0, bottom: 0, left: 0 }}>
                            {!roles && <TableHeaderCell style={{ width: '80px', color: tokens.colorCompoundBrandForeground1 }} >Select</TableHeaderCell>}
                            {Array.isArray(gridCols)
                                ? gridCols.map((elem: any, i: any) => (
                                    <>

                                        <TableHeaderCell style={{ width: elem.width ? elem.width : '', color: tokens.colorCompoundBrandForeground1 }} key={i}>  {elem.headerField ? elem.headerField() : elem.label}</TableHeaderCell>
                                    </>
                                ))
                                : null}


                        </TableRow>

                    </TableHeader>

                    <TableBody >
                        {datasource.map((e: any, i: any) => (
                            <TableRow style={{ backgroundColor: isSelect === i ? tokens.colorBrandForegroundOnLightPressed : '' }}>
                                {!roles && <TableCell className="detail-body"
                                    style={{ border: `1px solid ${tokens.colorNeutralForeground1}`, textAlign: 'center', cursor: 'pointer' }}
                                    onClick={() => {

                                        if (isSelect === i) {
                                            setIsSelect(null);
                                        } else {
                                            setIsSelect(i);
                                        }
                                    }}
                                >
                                    <SelectAllOnRegular
                                        className="select-icon"
                                        fontSize={25}
                                        style={{ color: isSelect === i ? 'white' : '' }}

                                    />
                                </TableCell>}
                                {gridCols.map((a: any, b: any) => (
                                    <>

                                        <TableCell key={b} className="detail-body" style={{ border: `1px solid ${tokens.colorNeutralForeground1}` }}>
                                            {a.displayField ? (
                                                a.displayField(e, i)
                                            ) : a.element ? (

                                                <BAComponentSwitcher
                                                    // disabled={disabledForm}
                                                    detail={true}
                                                    model={datasource[i]}
                                                    setModel={setRowObj}
                                                    rowIndex={i}
                                                    element={{
                                                        ...a.element,
                                                        searchBy: a.element.searchBy || {},
                                                        fillObj:
                                                            e && i
                                                                ? datasource[i][
                                                                a.element.fillObjName
                                                                ]
                                                                : null,
                                                        controller:
                                                            a.element.controller &&
                                                                typeof a.element.controller ===
                                                                "string"
                                                                ? a.element.controller
                                                                : a.element.controller
                                                                    ? a.element.controller(i)
                                                                    : null,
                                                        module:
                                                            a.element.module &&
                                                                typeof a.element.module === "string"
                                                                ? a.element.module
                                                                : a.element.module
                                                                    ? a.element.module(i)
                                                                    : null,
                                                        beforeSearch: a.element.beforeSearch
                                                            ? a.element.beforeSearch(i)
                                                            : null,
                                                        disabled:
                                                            a.element.disabled &&
                                                                typeof a.element.disabled !==
                                                                "boolean"
                                                                ? a.element.disabled(i)
                                                                : a.element.disabled === "boolean"
                                                                    ? a.element.disabled
                                                                    : false,
                                                    }}
                                                    rowChangeEv={(ev: any, val: any, element: any) => {
                                                        // if (b + 2 == gridCols.length) {
                                                        //     addRow()
                                                        // }
                                                        datasource[i] = {
                                                            ...datasource[i],
                                                            [element.key]: val,
                                                        };
                                                        setDatasource([...datasource]);
                                                    }}
                                                />


                                            ) : (
                                                e[a.key]
                                            )}
                                        </TableCell>
                                    </>


                                ))}

                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
            </div>

        </div>
    )
}
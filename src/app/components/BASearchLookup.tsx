"use client"
import * as React from "react";
import {
  makeStyles,
  useId,
  Body1,
  Button,
  Input,
  Label,
  tokens,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCellLayout,
  TableBody,
  TableCell,

} from "@fluentui/react-components";
import { AddCircleFilled, ArrowStepInRightRegular, CaretDownFilled, DismissCircleRegular, FilterFilled, MicRegular, SaveFilled, SearchFilled, XboxConsoleFilled } from "@fluentui/react-icons";
import type { ButtonProps } from "@fluentui/react-components";
import { BADialog } from "./BADialog";
import './custom.css'
import { GeneralCoreService } from "../config/GeneralCoreService";
import BAPagination from "./BAPagination";
import { BACheckBox } from "./BACheckBox";
import { BAInput } from "./BAInput";
import { BASelect } from "./BASelect";
import FALoader from "./FALoader";
import './custom.css'
import type { FC } from "react";
// import { BAPopover } from "./BAPopover";
import dynamic from "next/dynamic";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "100%",
    // height:'50px',
    // Stack the label above the field (with 2px gap per the design system)
    "> div": { display: "flex", flexDirection: "column", gap: "0px" },
  },
});

const MicButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      appearance="transparent"
      icon={<MicRegular />}
      size="small"
    />
  );
};

export const BASearchLookup = (props: any) => {
  const { value, onChange, type, disabled, label, controller, detail, module, filterConfig, displayField, multiple, onCancel } = props
 
  
  const inputId = useId("input");

  const [inpVal, setInpVal] = React.useState("");
  const [checkVal, setCheckVal] = React.useState<any>(filterConfig && filterConfig.length ? Object.values(filterConfig[0])[0] : '');

  const [property, setProperty] = React.useState({
    loading: false,
    openModal: false,
    openListView: false,
  });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [popoverID, setPopoverID] = React.useState<any>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [loader, setLoader] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false)
  const [arr, setArr] = React.useState<any>([])
  const [datasource, setDatasource] = React.useState<any>([]);
  const [list, setList] = React.useState<any>([]);
  const [filterValue, setFilterValue] = React.useState<any>("");
  const [paginatonConfig, setPaginationConfig] = React.useState({
    pageSize: 10,
    pageNo: 1,
    SearchBy: {},
    SearchVal: "",
    selector: {}
  });
  const [recordCount, setRecordCount] = React.useState(0);


  const getData = (Page?: any, Size?: any) => {
    console.log(list)
    setLoader(true);
    setProperty({ ...property, openListView: true });
    // paginatonConfig.selector = filterConfig.map((x:any) => x.field).join(",");
    // paginatonConfig.Distinct = distinct;
    // paginatonConfig.SearchBy = filterValue !== '' ? {[checkVal]:filterValue} : {}
    paginatonConfig.SearchVal = inpVal;
    // paginatonConfig.SearchBy = inpVal === '' ? JSON.stringify({}) : JSON.stringify({ [displayField]: inpVal });
    paginatonConfig.pageSize = Size ? Size : paginatonConfig.pageSize;
    let field = displayField
    GeneralCoreService(controller, null, module)
      .Lookup({ ...paginatonConfig })
      .then((res: any) => {

        res.data.rows.forEach((x: any, i: number) => {
          list.forEach((z: any) => {
            if (z[field] === x[displayField]) {
              x.checked = true
            }
          })

        })

        setDatasource([...res.data.rows]);
        setRecordCount(res.data?.TotalCount);
        setLoader(false);
        setProperty({ ...property, loading: false })
      })
      .catch((err: any) => {
        // displayError(err.message, "error");
        setLoader(false);
        setProperty({ ...property, loading: false })
      });
  };
  const handleIcon = () => {
    setIsOpen(true)
    getData()
  }
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      getData();

    }
  };
  const closeDialog = () => {
    setIsOpen(false)
    setRecordCount(0)
  }


  const handleDropCheck = (e: any, i: any) => {

    if (e.target.checked) {
      setArr((prev: any) => [...prev, list[i][displayField]])

    } else {
      let filt = arr.filter((x: any) => {
        return x !== list[i][displayField]
      })
      setArr([...filt])
    }
  }
  const handleRow = (i: any) => {
    if (!multiple) {
      onChange(null,list[i][displayField], list[i])
      setIsVisible2(false);
    }

  }



  const togglePopover = () => {
   
    setIsVisible(!isVisible);
  };

  const closePopover = () => {
    setIsVisible(false);
    setPopoverID(null)
  };
  // const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
  //   // Close the popover if the newly focused element is outside the popover
  //   if (
  //     popoverRef.current 
  //     && 
  //     !popoverRef.current.contains(event.relatedTarget as Node)
  //   ) {
  //     setIsVisible2(false);
  //   }
  // };
  console.log(popoverID,inputId)
  return (
    <div>
      <BADialog

        isOpen={isOpen}
        title={label}

        handleClick={() => {

          closeDialog()

        }}
        onClose={closeDialog}
        body={

          <div style={{
            height: '370px',

            overflowY: 'auto',
            position: 'relative',
          }}>
            {loader ? <FALoader /> : (
              <>
                <Table
                  role="grid"
                  aria-label="Table with grid keyboard navigation"
                  style={{
                    minWidth: "620px", marginTop: '10px',
                    backgroundColor: tokens.colorNeutralBackground1Selected,
                    zIndex: -700
                  }}
                >

                  <TableHeader style={{ height: '20px', borderBottom: '2px solid black' }}>

                    <TableRow>
                      {filterConfig?.map((el: any, i: any) => (
                        <TableHeaderCell key={i}
                          style={{
                            paddingLeft: i === 0 ? '25px' : '', cursor: i === 0 ? 'pointer' : '',

                          }}
                        >
                          <TableCellLayout style={{
                            color: tokens.colorNeutralStrokeAccessibleHover,

                            padding: '12px 0px',
                          }}>

                            {el.label}
                          </TableCellLayout>
                        </TableHeaderCell>
                      ))}
                    </TableRow>

                  </TableHeader>

                  <TableBody style={{ zIndex: 1000 }}>

                    {datasource && datasource.length && datasource.map((item: any, i: any) => (

                      <TableRow key={i}>
                        {filterConfig?.map((x: any, ind: any) => (
                          <TableCell
                            style={{
                              paddingLeft: ind === 0 ? '25px' : '', cursor: ind === 0 ? 'pointer' : '',
                              color: ind === 0 ? (item.checked ? 'black' : tokens.colorNeutralForeground2BrandHover) : '',
                              fontWeight: ind === 0 ? (item.checked ? 'bold' : '') : '',
                            }}
                            tabIndex={0}
                            role="gridcell"

                          >
                            {item[x.key]}
                          </TableCell>
                        ))}

                        <TableCell
                          style={{
                            paddingLeft: '30px'
                          }}
                          tabIndex={0}
                          role="gridcell"

                        >


                          <BACheckBox checked={item.checked} onChange={(e: any) => {


                            if (datasource[i].checked) {
                              datasource[i] = { ...datasource[i], checked: false }
                            } else {
                              datasource[i] = { ...datasource[i], checked: true }
                            }
                            setDatasource([...datasource])

                            if (e.target.checked) {
                              setList((prev: any) => [...prev, datasource[i]])
                            } else {
                              list.forEach((x: any, ind: any) => {

                                if (x[displayField] === datasource[i][displayField]) {
                                  list.splice(ind, 1)

                                }
                              })

                              setList([...list])
                            }

                          }} />
                        </TableCell>

                      </TableRow>
                    ))}


                  </TableBody>
                </Table>

                <div style={{ position: 'sticky', top: 0, right: 0, bottom: 0, left: 0 }}>
                  <BAPagination
                    flag='lookup'
                    totalCount={recordCount}
                    onPageChange={(page: any) => {
                      paginatonConfig.pageNo = page;
                      // setDatasource([])
                      getData()

                    }}
                  />
                </div>
              </>
            )}


          </div>

        }
        width={'900px'}
        height={'500px'}
        extraField={`Total Records: ${recordCount}`}
        extraHeader={
          <div className="d flex justify-content-center align-center">
            <div className="popover-container" ref={popoverRef}>
              <div className="popover-trigger" onClick={togglePopover}>
                <div className="d flex justify-content-center align-center" style={{ cursor: 'pointer' }}>
                  <FilterFilled fontSize={20} />
                  <div className="text-sm">Filter</div>
                  <CaretDownFilled fontSize={20} />
                </div>
              </div>
              {isVisible && (
                <div className="popover-content d flex flex-column justify-content-center align-center" style={{ backgroundColor: tokens.colorNeutralBackground1, fontSize: '14px', cursor: 'pointer' }} >
                  {filterConfig?.map((el: any, i: any) => (
                    <div style={{ backgroundColor: checkVal === el.key ? tokens.colorNeutralBackground1Selected : '' }} onClick={(e: any) => {
                      setCheckVal(e.target.textContent)
                      closePopover()
                    }}>

                      <span style={{ fontSize: '16px' }}>
                        {el.key}
                      </span>
                    </div>
                  ))}

                </div>
              )}
            </div>


            <BASelect


              width={'300px'}
              custom={true}
              options={datasource ? datasource.map((x: any) => x[checkVal === '' ? displayField : checkVal]) : []}
              value={filterValue}
              onChange={(e: any, val: any, obj: any) => {
                setFilterValue(e.target.value)
                paginatonConfig.SearchBy = JSON.stringify({ [checkVal]: e.target.value })
                getData()
              }}
            />
          </div>

        }

      />
      {/* <BAPopover/> */}
      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
        {!detail && <Label htmlFor={inputId} className="d flex justify-center align-center" style={{ paddingInlineEnd: "5px", textWrap: 'nowrap', alignItems: 'center', width: '100%', color: tokens.colorBrandForeground2Pressed }}>
          {label}
          <div className="ml-1 w-full h-0 mt-2" style={{ border: `1px dashed ${tokens.colorBrandForeground2Pressed}`, fontWeight: 'lighter' }}> </div>
        </Label>}
     
        <div className="popover-container w-[100%]" ref={popoverRef}>
          <div className="popover-trigger" 
          // onClick={() => setIsVisible2(!isVisible2)}
          >
            <div className="d flex justify-content-center align-center " style={{}}>
            
              <Input
                // appearance="underline"
                style={{ width: '100%',backgroundColor:detail?tokens.colorNeutralBackground1Hover:'' }}
                type={type}
                id={inputId}
                // id={beforeId}

                onKeyPress={handleKeyPress}
                value={value}
                onChange={(e)=>onChange(e)}
                disabled={disabled}
                contentAfter={
                   value === '' ? <div onClick={()=>{
                    setIsVisible2(!isVisible2)
                    // setTimeout(() => {
                    //   setIsVisible2(false)
                    // }, 200);
                    // setIsVisible2(false)
                    // setIsVisible2(!isVisible2)
                    if(popoverID === inputId){
                      setPopoverID(null)
                      console.log('a')
                      
                    }else{
                      setPopoverID(inputId)
                      console.log('b')
                     
                    }
                  
                    
                   }} style={{ cursor: 'pointer' }}>
                    <SearchFilled fontSize={18} />
                  </div> :
                    <div onClick={() => {
                      setIsVisible2(false)
                      onChange(null,undefined,'')
                      setArr([])
                      onCancel()
                    }} style={{ cursor: 'pointer',zIndex:10 }}>
                      <DismissCircleRegular fontSize={18} />
                    </div>

                }
              />
            </div>
          </div>
          {/* isVisible2 && */}
          { popoverID === inputId && isVisible2 && (
            <div 
            className="lookup-content d flex flex-column justify-content-center align-center"
            style={{  left: detail?'40%':'',transform: detail?'translateX(-20%)':'',width:detail?'350px':'', backgroundColor: tokens.colorNeutralBackground1, fontSize: '14px', cursor: 'pointer', padding: '1px' }}
            // onBlur={handleBlur}
            tabIndex={-1} // Make the popover focusable
            ref={popoverRef}
            >

              <Table
                // role="grid"
                aria-label="Table with grid keyboard navigation"
                style={{
                  backgroundColor: tokens.colorNeutralBackground1Selected,

                }}
              >
                {list.length !== 0 && <TableHeader style={{ height: '20px', borderBottom: '2px solid black' }}>

                  <TableRow>
                    {filterConfig?.map((el: any, i: any) => (
                      <TableHeaderCell key={i}>
                        <TableCellLayout style={{
                          color: tokens.colorNeutralStrokeAccessibleHover,
                          padding: '3px',
                          paddingLeft: i === 0 ? '10px' : ''
                        }}>
                          {el.label}
                        </TableCellLayout>


                      </TableHeaderCell>
                    ))}
                  </TableRow>

                </TableHeader>}



                {list.length === 0 ?
                  <div className="h-[165px]" style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="text-lg pb-3">No data found</div>
                    <div style={{ textAlign: 'center', border: '1px solid black', borderRadius: '3px', padding: '10px' }} onClick={handleIcon}>

                      <AddCircleFilled fontSize={25} />
                      <span style={{ textAlign: 'center', paddingLeft: '5px' }}>Add data</span>
                    </div>
                  </div> : <TableBody style={{
                    zIndex: 1000, textAlign: 'start'
                  }}>
                    {
                      list.map((item: any, i: any) => (

                        <TableRow key={i}
                          onClick={() => handleRow(i)}
                        >
                          {filterConfig?.map((x: any, ind: any) => (
                            <TableCell
                              style={{
                                cursor: 'pointer',
                                color: ind === 0 ? tokens.colorNeutralForeground2BrandHover : '',
                                paddingLeft: ind === 0 ? '10px' : ''
                              }}
                              tabIndex={0}
                              role="gridcell"

                            >

                              {ind === 0 && <ArrowStepInRightRegular fontSize={25} />}     {item[x.key]}
                            </TableCell>


                          ))}
                          {multiple &&
                            <TableCell
                              style={{
                                paddingLeft: '30px'
                              }}
                              tabIndex={0}
                              role="gridcell"
                            //   onClick={(e: any) => handleEdit(i)}
                            >
                              {/* {x.field === 'IsActive' && renderTag(x,item)} */}

                              <BACheckBox onChange={(e: any, index: any) => handleDropCheck(e, i)} />
                            </TableCell>
                          }
                        </TableRow>
                      ))}


                  </TableBody>

                }
              </Table>


              <div className="d flex justify-between align-center sticky inset-y-0 inset-x-0" style={{ zIndex: 1000, backgroundColor: tokens.colorNeutralBackground3Pressed }} >
                <div className="d flex justify-center align-center">
                  <div className="text-lg pl-3" onClick={handleIcon}>+ New</div>
                  {multiple && <span className="text-lg pl-3"><SaveFilled onClick={() => {
                    if (arr.length === 0) {
                      onChange('')
                       setIsVisible2(false)
                    } else {
                      onChange(null,arr.join(","))
                       setIsVisible2(false)
                    }

                  }} /></span>}
                </div>
                <div className="d flex justify-between align-center text-center">
                  <div style={{ color: tokens.colorNeutralForeground2BrandHover, paddingRight: '10px', paddingTop: '4px' }} onClick={handleIcon}>Show Details</div>
                  <div style={{ color: tokens.colorNeutralForeground2BrandHover, paddingRight: '10px', paddingTop: '4px' }} onClick={handleIcon}>Select from full list</div>
                </div>
              </div>
            </div>


          )}

        </div>


      </div>
    </div>
  );
};
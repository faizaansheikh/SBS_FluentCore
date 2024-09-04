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
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from "@fluentui/react-components";
import { CaretDownFilled, DismissCircleRegular, FilterFilled, MicRegular, SearchFilled, XboxConsoleFilled } from "@fluentui/react-icons";
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
import { json } from "stream/consumers";
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
// type propsType = {
//     value:any,
//     onChange:any,
//     type:any
// }
export const BASearchLookup = (props: any) => {
  const { value, onChange, type, disabled, label, controller, module, filterConfig, displayField, multiple, onCancel } = props



  const styles = useStyles();

  const beforeId = useId("content-before");
  const inputId = useId("input");

  const [inpVal, setInpVal] = React.useState("");
  const [checkVal, setCheckVal] = React.useState<any>(Object.values(filterConfig[0])[0] ?? '');

  const [property, setProperty] = React.useState({
    loading: false,
    openModal: false,
    openListView: false,
  });
  const [isVisible, setIsVisible] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [loader, setLoader] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false)
  const [arr, setArr] = React.useState<any>([])
  const [datasource, setDatasource] = React.useState<any>([]);
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
    setLoader(true);
    setProperty({ ...property, openListView: true });
    // paginatonConfig.selector = filterConfig.map((x:any) => x.field).join(",");
    // paginatonConfig.Distinct = distinct;
    // paginatonConfig.SearchBy = filterValue !== '' ? {[checkVal]:filterValue} : {}
    paginatonConfig.SearchVal = inpVal;
    // paginatonConfig.SearchBy = inpVal === '' ? JSON.stringify({}) : JSON.stringify({ [displayField]: inpVal });
    paginatonConfig.pageSize = Size ? Size : paginatonConfig.pageSize;

    GeneralCoreService(controller, null, module)
      .Lookup({ ...paginatonConfig })
      .then((res: any) => {
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
  const handleCheck = (e: any, i: any) => {
    if (e.target.checked) {
      setArr((prev: any) => [...prev, datasource[i][displayField]])
    } else {
      arr.splice(i, 1)
      setArr([...arr])


    }


  }
  const handleRow = (i: any) => {
    if (!multiple) {
      onChange(datasource[i][displayField], datasource[i])
      closeDialog()
    }

  }



  const togglePopover = () => {
    setIsVisible(!isVisible);
  };

  const closePopover = () => {
    setIsVisible(false);
  };


  return (
    <div >
      <BADialog

        isOpen={isOpen}
        title={label}

        handleClick={() => {
          if (multiple) {
            onChange(arr.join(","))
            closeDialog()
          } else {
            closeDialog()
          }
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
                  // {...keyboardNavAttr}
                  role="grid"
                  aria-label="Table with grid keyboard navigation"
                  style={{
                    minWidth: "620px", marginTop: '10px',
                    // height: '300px',
                    backgroundColor: tokens.colorNeutralBackground1Selected,
                    zIndex: -700
                  }}
                >

                  <TableHeader style={{ height: '20px', borderBottom: '2px solid black' }}>
                    {/* position: 'sticky', top: 0, right: 0, bottom: 0, left: 0,  */}
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
                      <TableRow key={i}
                        onClick={() => handleRow(i)}
                      >
                        {filterConfig?.map((x: any, ind: any) => (
                          <TableCell
                            style={{
                              paddingLeft: ind === 0 ? '25px' : '', cursor: ind === 0 ? 'pointer' : '',
                              color: ind === 0 ? tokens.colorNeutralForeground2BrandHover : ''
                            }}
                            tabIndex={0}
                            role="gridcell"

                          >
                            {/* {x.field === 'IsActive' && renderTag(x,item)} */}

                            {item[x.key]}
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

                            <BACheckBox onChange={(e: any) => handleCheck(e, i)} />
                          </TableCell>
                        }
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
                    <div style={{backgroundColor:checkVal === el.key ? tokens.colorNeutralBackground1Selected:'' }} onClick={(e:any)=>{
                      setCheckVal(e.target.textContent)
                      closePopover()
                    }}>
                     
                      <span style={{ fontSize: '16px'}}>
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
                paginatonConfig.SearchBy = JSON.stringify({[checkVal]:e.target.value})
                getData()
              }}
            />
          </div>

        }

      />

      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
        <Label htmlFor={inputId} className="d flex justify-center align-center" style={{ paddingInlineEnd: "5px", textWrap: 'nowrap', alignItems: 'center', width: '100%', color: tokens.colorBrandForeground2Pressed }}>
          {label}
          <div className="ml-1 w-full h-0 mt-2" style={{ border: `1px dashed ${tokens.colorBrandForeground2Pressed}`, fontWeight: 'lighter' }}> </div>
        </Label>
        {/* <Label htmlFor={beforeId}>{label}</Label> */}
        <Input
          // appearance="underline"
          style={{ width: '100%' }}
          type={type}
          id={inputId}
          // id={beforeId}

          onKeyPress={handleKeyPress}
          value={value}
          onChange={onChange}
          disabled={disabled}
          contentAfter={
            value.length === 0 ? <div onClick={handleIcon} style={{ cursor: 'pointer' }}>
              <SearchFilled fontSize={18} />
            </div> :
              <div onClick={() => {
                setArr([])
                onCancel()
              }} style={{ cursor: 'pointer' }}>
                <DismissCircleRegular fontSize={18} />
              </div>

          }
        />

      </div>
    </div>
  );
};
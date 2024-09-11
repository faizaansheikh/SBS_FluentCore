import * as React from "react";
import { useState } from "react";
import {

  CalendarMonthRegular,
} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
  Button,
  useArrowNavigationGroup,
  useFocusableGroup,
  Tag,
  tokens,
  Tooltip,
  Input,
} from "@fluentui/react-components";
import BAScreenHeader from "./BAScreenHeader";
import { BAButton } from "./BAButton";
import { GeneralCoreService } from "../config/GeneralCoreService";
import BAPagination from "./BAPagination";
import FALoader from "./FALoader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import nodata from '../assets/images/nodata.png'



export const BASetupGrid = (props: any) => {
  const { controller,
    // addEdit,
    rowMenu,
    title,
    config,
    primaryKey,
    FormName,
    module, path } = props
  const router = useRouter()
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const [gridCols, setGridCols] = useState([...config]);


  const [datasource, setDatasource] = useState<any>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [gridSearchObj, setGridSearchObj] = useState<any>({});
  const [isHovered, setIsHovered] = useState(false);
  const [flag, setFlag] = useState(true);
  const [headerName, setHeaderName] = useState('');
  const [property, setProperty] = useState({
    filterLoading: false,
    loading: false,
    deleteLoading: false,
    isSelecting: false,
    isColumnEditing: false,
    isPosting: false,
  });
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });

  const getLabelAndColor = (x: any, item: any) => {


    let color = ''
    let label = ''
    switch (x.field) {
      case 'IsActive':
        color = item[x.field] ? 'green' : 'red'
        label = item[x.field] ? 'Active' : 'InActive'
        break;
      default:
        return null
    }
    return { label, color }
  }
  const renderTag = (x: any, item: any) => {


    const result = getLabelAndColor(x, item)
    if (result) {
      return <Tag style={{ color: result.color }} icon={<CalendarMonthRegular />}>{result.label}</Tag>
    }

  }
  // const SearchCriteria = {
  //   pageSize: 10,
  //   pageNo: 1,
  //   selector: config.map((x:any) => x.field).join(","),
  // };
  const SearchCriteria: {
    pageSize: number;
    pageNo: number;
    SearchBy?: any;
    selector: string;
  } = {
    pageSize: 10,
    pageNo: 1,
    selector: config.map((x: any) => x.field).join(","),
  };
  let getData = (object?: any, filter?: any) => {
    if (filter) {
      setProperty({ ...property, filterLoading: true })
    } else {
      setProperty({ ...property, loading: true });
    }


    let obj = {
      ...SearchCriteria,
      SearchBy: JSON.stringify(object ?? gridSearchObj),
    };

    GeneralCoreService(`${module}/${FormName}`)
      .Register(obj)
      .then((res: any) => {

        // setDatasource([...res.data.rows]);
        setTotalRecords(res.data.TotalCount);
        if (filter) {
          setProperty({ ...property, filterLoading: false })
        } else {
          setProperty({ ...property, loading: false });
        }
      })
      .catch((err) => {
        if (filter) {
          setProperty({ ...property, filterLoading: false })
        } else {
          setProperty({ ...property, loading: false });
        }
      });
  };

  const handleEdit = (i: any) => {


    router.push(`${path}/${datasource[i][primaryKey]}`)
  }
  const addEdit = () => {


    router.push(path)
  }
  const handleFilter = (name: any) => {


    let filters = gridCols.filter((x: any) => x.title !== name)
    setGridCols([...filters])



  }

  React.useEffect(() => {

    getData();

  }, []);
  console.log(gridSearchObj)
  return (

    <div className="p-2">

      <div >
        <BAScreenHeader title={title} onClick={addEdit} apiCall={getData} setState={setGridSearchObj} loading={property} setLoading={setProperty} />
      </div>
      {property.loading ? <FALoader /> :
        <Table
          {...keyboardNavAttr}
          role="grid"
          aria-label="Table with grid keyboard navigation"
          style={{
            minWidth: "620px", marginTop: '10px', backgroundColor: tokens.colorNeutralBackground1Selected,


          }}
        >



          {datasource.length === 0 ? <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Image alt='' src={nodata} style={{ width: '600px', height: '' }} />
          </div> : <>
            <TableHeader style={{ height: '20px', borderBottom: '2px solid black' }}>

              <TableRow>
                {gridCols.map((el: any, i: any) => (
                  <TableHeaderCell key={i}
                    style={{
                      paddingLeft: i === 0 ? '25px' : '', cursor: i === 0 ? 'pointer' : '',

                    }}
                    onMouseEnter={() => {
                      setIsHovered(true)
                      setHeaderName(el.title)
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                  >

                    <TableCellLayout style={{ color: tokens.colorNeutralStrokeAccessibleHover, padding: '12px 0px' }}>

                      {el.title} {(isHovered && headerName === el.title) && <span onClick={() => handleFilter(el.title)} className="cursor-pointer font-bold text-md">x</span>}
                    </TableCellLayout>




                  </TableHeaderCell>
                ))}


              </TableRow>

            </TableHeader>
            <TableBody>
              <TableRow>

                {gridCols.map((x: any) => <TableCell
                  style={{
                    // paddingLeft: '25px',
                    // color: i === 0 ? tokens.colorNeutralForeground2BrandHover : ''
                  }}
                  tabIndex={0}
                  role="gridcell"
                // onClick={(e: any) => handleEdit(i)}
                >
                  {" "}
                  <Input appearance="underline"
                    onBlur={(e: any) => {

                      gridSearchObj[x.field] = e.target.value
                      setGridSearchObj({ ...gridSearchObj })
                      getData(null, 'filter')
                    }}
                  />
                </TableCell>)}

              </TableRow>
              {property.filterLoading ? <FALoader /> : datasource && datasource.length && datasource.map((item: any, i: any) => (

                <TableRow key={i}>

                  {gridCols.map((x: any, ind: any) => (
                    <TableCell
                      style={{
                        paddingLeft: ind === 0 ? '25px' : '', cursor: ind === 0 ? 'pointer' : '',
                        color: ind === 0 ? tokens.colorNeutralForeground2BrandHover : ''
                      }}
                      tabIndex={0}
                      role="gridcell"
                      onClick={(e: any) => handleEdit(i)}
                    >
                      {/* {x.field === 'IsActive' && renderTag(x,item)} */}
                      {renderTag(x, item)}
                      {item[x.field]}
                    </TableCell>


                  ))}

                </TableRow>
              ))}



            </TableBody>
          </>
          }


        </Table>}
          {datasource.length !== 0 &&  <BAPagination
        totalCount={totalRecords}
        onPageChange={(page: any) => {
          SearchCriteria.pageNo = page;

          getData()

        }}
      />}
     
    </div>
  );
};
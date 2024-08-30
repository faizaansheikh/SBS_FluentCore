import * as React from "react";
import { useState } from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  DeleteRegular,
  ArrowDownloadRegular,
  AddRegular,
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
} from "@fluentui/react-components";
import BAScreenHeader from "./BAScreenHeader";
import { BAButton } from "./BAButton";
import { GeneralCoreService } from "../config/GeneralCoreService";
import BAPagination from "./BAPagination";
import FALoader from "./FALoader";
import { useRouter } from "next/navigation";




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
  const [gridSearchObj, setGridSearchObj] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [property, setProperty] = useState({
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
  let getData = (SearchObj?: any) => {
    setProperty({ ...property, loading: true });

    let obj = {
      ...SearchCriteria,
      SearchBy: JSON.stringify(SearchObj ?? gridSearchObj),
    };

    GeneralCoreService(`${module}/${FormName}`)
      .Register(obj)
      .then((res: any) => {
        console.log([...res.data.rows]);
        setDatasource([...res.data.rows]);
        setTotalRecords(res.data.TotalCount);
        setProperty({ ...property, loading: false });
      })
      .catch((err) => {
        setProperty({ ...property, loading: false });
      });
  };

  const handleEdit = (i: any) => {
      console.log(datasource[i][primaryKey]);
      
    router.push(`${path}/${datasource[i][primaryKey]}`)
  }
  const addEdit = () => {
   

    router.push(path)
  }
  React.useEffect(() => {
    getData();

  }, []);

  return (

    <div>
     
      <BAScreenHeader title={title} onClick={addEdit} />
      {property.loading ? <FALoader /> : <Table
        {...keyboardNavAttr}
        role="grid"
        aria-label="Table with grid keyboard navigation"
        style={{ minWidth: "620px", marginTop: '10px', backgroundColor: tokens.colorNeutralBackground1Selected }}
      >

        <TableHeader style={{ height: '20px', position: 'sticky', top: 0, right: 0, bottom: 0, left: 0, borderBottom: '2px solid black' }}>

          <TableRow>
            {gridCols.map((el: any, i: any) => (
              <TableHeaderCell key={i}>
                <TableCellLayout style={{ color: tokens.colorNeutralStrokeAccessibleHover, padding: '12px 0px' }}>

                  {el.title}
                </TableCellLayout>


              </TableHeaderCell>
            ))}
            {/* <TableHeaderCell>
              <TableCellLayout style={{ display: 'flex', justifyContent: 'end' }} >
                Actions
              </TableCellLayout>
            </TableHeaderCell> */}



          </TableRow>

        </TableHeader>

        <TableBody>

          {datasource && datasource.length && datasource.map((item: any, i: any) => (
            <TableRow key={i}>
              {config.map((x: any, ind: any) => (
                <TableCell
                  style={{
                    paddingLeft: ind === 0 ? '15px' : '', cursor: ind === 0 ? 'pointer' : '',
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
              {/* <TableCell tabIndex={0} {...focusableGroupAttr}>
                <TableCellLayout style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button icon={<EditRegular />} aria-label="Edit" />
                  <Button icon={<DeleteRegular />} aria-label="Delete" />
                </TableCellLayout>
              </TableCell> */}
            </TableRow>
          ))}


        </TableBody>
      </Table>}

      <BAPagination
        totalCount={totalRecords}
        onPageChange={(page: any) => {
          SearchCriteria.pageNo = page;

          getData()

        }}
      />
    </div>
  );
};
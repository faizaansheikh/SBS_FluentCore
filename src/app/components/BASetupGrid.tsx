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
} from "@fluentui/react-components";
import BAScreenHeader from "./BAScreenHeader";
import { BAButton } from "./BAButton";
import { GeneralCoreService } from "../config/GeneralCoreService";
import BAPagination from "./BAPagination";


const items = [
  {
    // file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
    lastUpdate: {
      label: "You edited this",
      icon: <EditRegular />,
    },
  },
  {
    // file: { label: "Thursday presentation", icon: <FolderRegular /> },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    // file: { label: "Training recording", icon: <VideoRegular /> },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    // file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
];
const rows = [
  {
    "rowID": "10225",
    "Id": "10225",
    "UserName": "Syed",
    "Password": "syed123",
    "IsActive": true,
    "Designation": "syedinformation",
    "DefaultLocationCode": "Clifton",
    "DefaultLocation": "Clifton",
    "Email": "syed@gmail.com",
    "ContactNo": "878988098098",
  },
  {
    "rowID": "10225",
    "Id": "102252",
    "UserName": "Syed",
    "Password": "syed123",
    "IsActive": false,
    "Designation": "syedinformation",
    "DefaultLocationCode": "Clifton",
    "DefaultLocation": "Clifton",
    "Email": "syed@gmail.com",
    "ContactNo": "878988098098",
  }
]

export const BASetupGrid = (props: any) => {
  const { controller,
    addEdit,
    rowMenu,
    title,
    config,
    primaryKey,
    FormName,
    module } = props
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const [gridCols, setGridCols] = useState([...config]);
  const [datasource, setDatasource] = useState<any>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [gridSearchObj, setGridSearchObj] = useState({});
  const [property, setProperty] = useState({
    loading: false,
    deleteLoading: false,
    isSelecting: false,
    isColumnEditing: false,
    isPosting: false,
  });

  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  const item =
    [


      {
        key: 'Add',
        text: 'Add',
        iconProps: { iconName: 'Add' },
        onClick: () => addEdit()

      },

    ]
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
  const SearchCriteria = {
    pageSize: 10,
    pageNo: 1,
    selector: config.map((x:any) => x.field).join(","),
  };
  let getData = (SearchObj?: any) => {
    setProperty({ ...property, loading: true });

    let obj = {
      ...SearchCriteria,
      SearchBy: JSON.stringify(SearchObj ?? gridSearchObj),
    };

    GeneralCoreService(`${module}/${FormName}`)
      .Register(obj)
      .then((res:any) => {
        console.log([...res.data.rows]);
        setDatasource([...res.data.rows]);
        setTotalRecords(res.data.TotalCount);
        setProperty({ ...property, loading: false });
      })
      .catch((err) => {
        setProperty({ ...property, loading: false });
      });
  };
  React.useEffect(() => {
    getData();
 
  }, []);
  return (

    <div>
      {/* <BAScreenHeader title={title} headerOptions={[
        {
          displayField: () => <BAButton icon={<ArrowDownloadRegular color="blue" fontSize={18} />} label={'Upload'} />
        },
        {
          displayField: () => <BAButton onClick={addEdit} icon={<AddRegular color="blue" fontSize={18} />} label={'Add New'} />
        },
      ]} /> */}
       <BAScreenHeader title={title} onClick={addEdit}/>
      <Table
        {...keyboardNavAttr}
        role="grid"
        aria-label="Table with grid keyboard navigation"
        style={{ minWidth: "620px", marginTop: '10px' }}
      >
        <TableHeader style={{ height: '20px', position: 'sticky', top: 0, right: 0, bottom: 0, left: 0 }}>
          <TableRow>
            {gridCols.map((el: any, i: any) => (
              <TableHeaderCell key={i}>
                <TableCellLayout>

                  {el.title}
                </TableCellLayout>


              </TableHeaderCell>
            ))}
            <TableCellLayout style={{ display: 'flex', justifyContent: 'end' }} >
              Actions
            </TableCellLayout>
            {/* {columns.map((column) => (
              <TableHeaderCell>
                  
                <TableCellLayout style={
              
                  column.label === 'Actions'? {display:'flex',justifyContent:'end'}:{}
                  } key={column.columnKey}
               >
                  {column.label}
                </TableCellLayout>

              </TableHeaderCell>
            ))} */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {datasource && datasource.length && datasource.map((item: any, i: any) => (
            <TableRow key={i}>
              {config.map((x: any, ind: any) => (
                <TableCell tabIndex={0} role="gridcell">
                  {/* {x.field === 'IsActive' && renderTag(x,item)} */}
                  {renderTag(x, item)}
                  {item[x.field]}
                </TableCell>
              ))}
              <TableCell tabIndex={0} {...focusableGroupAttr}>
                <TableCellLayout style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button icon={<EditRegular />} aria-label="Edit" />
                  <Button icon={<DeleteRegular />} aria-label="Delete" />
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        
          {/* {items.map((item, i) => (
            <TableRow key={i}>

              <TableCell tabIndex={0} role="gridcell">
                <TableCellLayout
                  media={
                    <Avatar
                      aria-label={item.author.label}
                      name={item.author.label}
                      badge={{
                        status: item.author.status as PresenceBadgeStatus,
                      }}
                    />
                  }
                >
                  {item.author.label}
                </TableCellLayout>

              </TableCell>

              <TableCell tabIndex={0} role="gridcell">
                {item.lastUpdated.label}
              </TableCell>
              
              <TableCell tabIndex={0} role="gridcell">

                <TableCellLayout media={item.lastUpdate.icon}>
                  {item.lastUpdate.label}
                </TableCellLayout>

              </TableCell>

              <TableCell tabIndex={0} {...focusableGroupAttr}>
                <TableCellLayout style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button icon={<EditRegular />} aria-label="Edit" />
                  <Button icon={<DeleteRegular />} aria-label="Delete" />
                </TableCellLayout>
              </TableCell>

            </TableRow>
          ))} */}
        </TableBody>
      </Table>
      <BAPagination totalCount={totalRecords}/>
    </div>
  );
};
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
import { MicRegular, SearchFilled } from "@fluentui/react-icons";
import type { ButtonProps } from "@fluentui/react-components";
import { BADialog } from "./BADialog";
import './custom.css'
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
    const { value, onChange, type, disabled, label,config } = props
    const styles = useStyles();

    const beforeId = useId("content-before");
    const inputId = useId("input");
    const[isOpen,setIsOpen] = React.useState(false)
    const [datasource, setDatasource] = React.useState<any>([]);
    //   contentBefore={<PersonRegular />}
    // className={styles.root}
    const handleIcon = () => {
        setIsOpen(true)
    }
    return (
        <div >
            {/* open, setOpen, close, body, footer, title  */}
            <BADialog 
            open={isOpen} 
            setOpen={setIsOpen} 
            close={() => 
            setIsOpen(false)}
            width='700px'
            body={
            <div style={{}}>
                  <Table
        // {...keyboardNavAttr}
        role="grid"
        aria-label="Table with grid keyboard navigation"
        style={{ minWidth: "620px", marginTop: '10px', backgroundColor: tokens.colorNeutralBackground1Selected }}
      >

        <TableHeader style={{ height: '20px', position: 'sticky', top: 0, right: 0, bottom: 0, left: 0, borderBottom: '2px solid black' }}>

          <TableRow>
            {config.map((el: any, i: any) => (
              <TableHeaderCell key={i}
              style={{
                paddingLeft: i === 0 ? '25px' : '', cursor: i === 0 ? 'pointer' : '',
       
              }}
              >
                <TableCellLayout style={{ color: tokens.colorNeutralStrokeAccessibleHover, padding: '12px 0px' }}>

                  {el.title}
                </TableCellLayout>


              </TableHeaderCell>
            ))}
         



          </TableRow>

        </TableHeader>

        <TableBody>

          {datasource && datasource.length && datasource.map((item: any, i: any) => (
            <TableRow key={i}>
              {config.map((x: any, ind: any) => (
                <TableCell
                  style={{
                    paddingLeft: ind === 0 ? '25px' : '', cursor: ind === 0 ? 'pointer' : '',
                    color: ind === 0 ? tokens.colorNeutralForeground2BrandHover : ''
                  }}
                  tabIndex={0}
                  role="gridcell"
                //   onClick={(e: any) => handleEdit(i)}
                >
                  {/* {x.field === 'IsActive' && renderTag(x,item)} */}
                 
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
      </Table>
            </div>
             }
            />
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <Label htmlFor={inputId} className="d flex justify-center align-center" style={{ paddingInlineEnd: "5px", textWrap: 'nowrap', alignItems: 'center', width: '100%', color: tokens.colorBrandForeground2Pressed }}>
                    {label}
                    <div className="ml-1 w-full h-0 mt-2" style={{border: `1px dashed ${tokens.colorBrandForeground2Pressed}`,fontWeight:'lighter'}}> </div>
                </Label>
                {/* <Label htmlFor={beforeId}>{label}</Label> */}
                <Input
                    // appearance="underline"
                    style={{ width: '100%' }}
                    type={type}
                    id={inputId}
                    // id={beforeId}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    contentAfter={
                        <div onClick={()=>handleIcon()} style={{cursor:'pointer'}}>
                            <SearchFilled fontSize={18}/>
                        </div>
                    }
                />

            </div>
        </div>
    );
};
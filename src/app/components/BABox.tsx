import { tokens } from "@fluentui/react-components";

export default function BABox(props:any){
    // backgroundColor:'#F0F0F0',
    return  <div style={{backgroundColor:tokens.colorNeutralBackground1Pressed,padding:'15px',marginTop:'15px',borderRadius:'5px'}}>{props.children}</div>
}
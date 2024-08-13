"use client"
import { makeStyles, Text } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    gap: "16px",
    display: "flex",
    justifyContent:'center',
    // flexDirection: "row",
    alignItems: "center",
  },
});
export default function BAText(props:any){
    const styles = useStyles();
    return (
        // <span style={{display:'flex',flexDirection:'column'}}>
        <Text style={props.style}  size={500}>{props.children}</Text >
    
    )
}
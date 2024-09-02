import { tokens } from "@fluentui/react-components";

export default function BABox(props: any) {
    // backgroundColor:'#F0F0F0',
    return <div  style={{ backgroundColor: tokens.colorNeutralBackground1Hover, padding: '15px', marginTop: '15px', borderRadius: '5px' }}>

        <div className="border-b-2 " style={{
            borderColor: tokens.colorNeutralForeground2LinkSelected,
            marginBottom: '18px',
            fontSize: '18px',
            fontWeight: 500,
            paddingBottom: '8px',
            display:'flex',
            justifyContent:'space-between'
        }}>
            {props.title}
            {props.show &&
             <div style={{fontSize:'13px',color:tokens.colorBrandForeground2Pressed}}>
             {props.show}
         </div>
            }
           
        </div>

       

        {props.children}
    </div>
}
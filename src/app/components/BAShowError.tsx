import * as React from "react";
import {
  useId,
  Button,
  Field,
  RadioGroup,
  Radio,
  Toaster,
  useToastController,
  ToastPosition,
  ToastTitle,
  Toast,
} from "@fluentui/react-components";

export const BAShowError = (props:any) => {
    console.log('toast here...')
    const{message,open,type,close} = props
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const [position, setPosition] = React.useState<ToastPosition>("bottom");
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { position, intent: type?type:'success' }
    );
    React.useEffect(()=>{
        if(open){
            notify()
            setTimeout(() => {
                close()
            }, 1000);
        }
    },[open])
  
    
  return (
    <>
     
      <Toaster toasterId={toasterId} />
      
    </>
  );
};
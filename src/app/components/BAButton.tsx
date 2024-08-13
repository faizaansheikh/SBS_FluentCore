import * as React from "react";
import { makeStyles, Button } from "@fluentui/react-components";

const useStyles = makeStyles({
    innerWrapper: {
        columnGap: "15px",
        display: "flex",
    },
    outerWrapper: {
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
    },
    btn: {
        border:'none'
    }
});

// appearance='primary' 
export const BAButton = (props: any) => {
    const styles = useStyles();
    const { disabled ,label, icon ,onClick,style} = props
    return (
        <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
                {icon ?  <Button style={style ? style : {}} className={styles.btn} onClick={onClick}  icon={icon} disabled={disabled}>{label}</Button>
                :  <Button  style={style ? style : {}} className={styles.btn}  onClick={onClick}  disabled={disabled}>{label}</Button>}
               
              

            </div>

        </div>
    );
};
import { Label,Input, makeStyles } from "@fluentui/react-components";

export default function BASearchLookup(props: any) {
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
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <div>
                <Label htmlFor={beforeId}>{label}</Label>
                <Input
                    appearance="underline"
                    type={type}
                    id={beforeId}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />

            </div>
        </div>
    )
}
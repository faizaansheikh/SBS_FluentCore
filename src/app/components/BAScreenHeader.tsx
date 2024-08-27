import * as React from "react";
import {
    FontIncrease24Regular,
    FontDecrease24Regular,
    TextFont24Regular,
    MoreHorizontal24Filled,
    SaveRegular,
    AddRegular,
    ArrowDownRegular,
    ChevronDownFilled,
    DeleteRegular,
    FilterFilled,
    AppsListRegular,
} from "@fluentui/react-icons";
import {
    Toolbar,
    ToolbarButton,
    ToolbarDivider,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    makeStyles,
    ToolbarGroup,
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";
import { BAButton } from "./BAButton";
const useStyles = makeStyles({
    toolbar: {

        justifyContent: "space-between",
        marginTop: '10px',
        borderTop: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey'
    },
});
const BAScreenHeader = (props: any) => {
    const farGroupStyles = useStyles();
    const {  title,onClick } = props

    return (
        <Toolbar aria-label="Default" className={farGroupStyles.toolbar}>

            <ToolbarGroup role="" style={{ display: 'flex', flexDirection: 'row' }}>


                <BAButton style={{ fontSize: '20px' }}  label={title} />
                <ToolbarDivider />

                <BAButton style={{ fontSize: '15px' }} icon={<ChevronDownFilled color="blue" fontSize={18} />} label={'All'} />
                <ToolbarDivider />

                <BAButton onClick={onClick} icon={<AddRegular color="blue" fontSize={18} />} label={'New'} />
                <ToolbarDivider />

                <BAButton  icon={<DeleteRegular color="blue" fontSize={18} />} label={'Delete'} />
                <ToolbarDivider />

            </ToolbarGroup>
            <ToolbarGroup role="" style={{ display: 'flex', flexDirection: 'row' }}>
                <BAButton style={{ fontSize: '20px' }} icon={<AppsListRegular color="black" fontSize={36} />} label={''} />

                <ToolbarDivider />

                <BAButton style={{ fontSize: '20px' }} icon={<FilterFilled color="black" fontSize={36} />} label={''} />

            </ToolbarGroup>


        </Toolbar>
    )
}



export default BAScreenHeader;
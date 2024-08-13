"use client";
import { DrawerProps, FluentProvider, Label, Radio, RadioGroup, Switch, teamsDarkTheme, teamsLightTheme } from "@fluentui/react-components";
import * as React from "react";
import {
    AppItem,
    Hamburger,
    NavCategory,
    NavCategoryItem,
    NavDivider,
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavDrawerProps,
    NavItem,
    NavSectionHeader,
    NavSubItem,
    NavSubItemGroup,
} from "@fluentui/react-nav-preview";

import {
    Tooltip,
    makeStyles,
    tokens,
    useId,
     
} from "@fluentui/react-components";
import {
    Board20Filled,
    Board20Regular,
    BoxMultiple20Filled,
    BoxMultiple20Regular,
    DataArea20Filled,
    DataArea20Regular,
    DocumentBulletListMultiple20Filled,
    DocumentBulletListMultiple20Regular,
    HeartPulse20Filled,
    HeartPulse20Regular,
    MegaphoneLoud20Filled,
    MegaphoneLoud20Regular,
    NotePin20Filled,
    NotePin20Regular,
    People20Filled,
    People20Regular,
    PeopleStar20Filled,
    PeopleStar20Regular,
    Person20Filled,
    PersonLightbulb20Filled,
    PersonLightbulb20Regular,
    Person20Regular,
    PersonSearch20Filled,
    PersonSearch20Regular,
    PreviewLink20Filled,
    PreviewLink20Regular,
    bundleIcon,
    PersonCircle32Regular,
    ToggleLeftFilled,
    ToggleLeft48Filled,
} from "@fluentui/react-icons";
import { CommandBar, ICommandBarItemProps } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { AppBar } from "./appbar/page";
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { menues } from "./Menus";
initializeIcons();

const useStyles = makeStyles({
    root: {
        overflow: "hidden",
        display: "flex",
        // height: "600px",
    },
    content: {
        // flex: "1",
        padding: "16px",
        // display: "grid",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: '100%'
    },
    field: {
        display: "flex",
        marginTop: "4px",
        marginLeft: "8px",
        flexDirection: "column",
        gridRowGap: tokens.spacingVerticalS,
    },
});

const Person = bundleIcon(Person20Filled, Person20Regular);
const Dashboard1 = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(
    PersonLightbulb20Filled,
    PersonLightbulb20Regular
);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(
    PreviewLink20Filled,
    PreviewLink20Regular
);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(
    DocumentBulletListMultiple20Filled,
    DocumentBulletListMultiple20Regular
);

type DrawerType = Required<DrawerProps>["type"];

const Dashboard = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const styles = useStyles();

    const typeLabelId = useId("type-label");
    const linkLabelId = useId("link-label");

    const [isOpen, setIsOpen] = React.useState(true);
    const [enabledLinks, setEnabledLinks] = React.useState(true);
    const [toggle, setToggle] = React.useState(false);
    const [type, setType] = React.useState<DrawerType>("inline");

    const linkDestination = enabledLinks ? "https://www.bing.com" : "";

    const renderHamburgerWithToolTip = () => {
        return (
            <Tooltip content="Navigation" relationship="label">
                <Hamburger onClick={() => setIsOpen(!isOpen)} />
            </Tooltip>
        );
    };
    const renderSwitchWithToolTip = () => {
        return (
           
            <Tooltip content="toggle" relationship="label" >
                 <Switch  onChange={(e:any)=>e.target.value && setToggle(!toggle)}  />
                {/* <ToggleLeft48Filled onClick={() => setToggle(!toggle)} /> */}
            </Tooltip>
        );
    };
    const iconClass = mergeStyles({
        fontSize: 20,
        // height: 50,
        // width: 50,
        // margin: '25px 0px',
    });
    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <FluentProvider theme={toggle ? teamsDarkTheme : teamsLightTheme}>
            <div >

                {isClient && <div className={styles.root}>
                    <NavDrawer
                        defaultSelectedValue="2"
                        defaultSelectedCategoryValue="1"
                        open={isOpen}
                        type={type}
                    >
                       <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                       <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
                       <NavDrawerHeader >{renderSwitchWithToolTip()}</NavDrawerHeader>
                       </div>

                        <NavDrawerBody>
                            <AppItem
                                icon={<PersonCircle32Regular />}
                                as="a"
                                href={linkDestination}
                            >
                               Admin
                            </AppItem>
                            <NavItem href={linkDestination} icon={<Dashboard1 />} value="1">
                                Dashboard
                            </NavItem>

                            {
                                menues.map((el: any, i: any) => (
                                    <>
                                        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                            {el.icon && <span style={{ marginTop: '4px' }}> <FontIcon aria-label="Compass" iconName={el.icon} className={iconClass} /></span>}
                                            <NavSectionHeader >{el.title}</NavSectionHeader>
                                        </div>
                                        {el.children.length > 0 &&
                                            el.children.map((x: any, ind: any) => (
                                                <NavCategory key={ind} value={x.title + i}>
                                                    <NavCategoryItem icon={''} >
                                                        {x.title}
                                                    </NavCategoryItem>
                                                    {x.child.length > 0 &&
                                                        x.child.map((z: any, ix: any) => (
                                                            <NavSubItemGroup >
                                                                <NavSubItem href={z.route} value={z.name + i} >
                                                                    {z.name}
                                                                </NavSubItem>

                                                            </NavSubItemGroup>
                                                        ))}
                                                </NavCategory>

                                            )

                                            )}

                                    </>
                                ))
                            }

                        </NavDrawerBody>
                    </NavDrawer>
                    <div className={styles.content}>

                    {/* <AppBar  /> */}
                    {/* <AppBar openHam={isOpen} icon={renderHamburgerWithToolTip()} /> */}
                        {children}

                    </div>
                </div>}
            </div>
        </FluentProvider>
    );
};
export default Dashboard;

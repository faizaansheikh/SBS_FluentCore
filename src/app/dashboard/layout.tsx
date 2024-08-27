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
import { useRouter } from "next/navigation";
import MasterContainer from "../config/MasterContainer";

initializeIcons();

const useStyles = makeStyles({
    root: {
        // overflow: "hidden",
        display: "flex",
 
    },
    content: {
        // flex: "1",
        // paddingLeft: "10px",
       
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
    const router = useRouter();
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
                <Switch onChange={(e: any) => e.target.value && setToggle(!toggle)} />
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
    const changeRoute = (route: any) => {
        router.push(route)
    }
    React.useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <FluentProvider theme={toggle ? teamsDarkTheme : teamsLightTheme}>
  
            <div>
                {/* <div style={{ position:'fixed',top:0,left:0,right:100,zIndex:100}}></div> */}
                {isClient && <div className={styles.root}>
                    <NavDrawer
                        defaultSelectedValue="2"
                        defaultSelectedCategoryValue="1"
                        open={isOpen}
                        type={type}
                        style={{ height: '100vh',
                            // overflow: "hidden",
                         
                           
                            
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                            <NavItem onClick={() => changeRoute('/dashboard')} icon={<Dashboard1 />} value="1">
                                Dashboard
                            </NavItem>
                            {
                                menues.map((el: any, i: any) => (
                                    <NavCategory value={i}>
                                        <NavCategoryItem style={{ backgroundColor: tokens.colorNeutralBackground1Pressed }} icon={<JobPostings />}>
                                            {el.title}
                                        </NavCategoryItem>
                                        <NavSubItemGroup>
                                            {el.children.map((x: any, ind: any) => (
                                                <NavCategory key={ind} value={x.title + i}>
                                                    <NavCategoryItem style={{ fontSize: '14px' }} icon={''}>
                                                        {x.title}

                                                    </NavCategoryItem>
                                                    {x.child.length && x.child.map((z: any, index: any) => (
                                                        <NavSubItemGroup key={index}>
                                                            {/* colorNeutralForegroundDisabled */}
                                                            <NavSubItem style={{ backgroundColor: tokens.colorNeutralBackground1Pressed, fontSize: '13px' }} onClick={() => changeRoute(z.route)} value={z.name} >
                                                                {z.name}
                                                            </NavSubItem>

                                                        </NavSubItemGroup>
                                                    ))}


                                                </NavCategory>
                                            ))}


                                            {/* <NavSubItem href={linkDestination} value="7">
                                                Openings
                                            </NavSubItem>
                                            <NavSubItem href={linkDestination} value="8">
                                                Submissions
                                            </NavSubItem> */}
                                        </NavSubItemGroup>
                                    </NavCategory>

                                ))
                            }


                        </NavDrawerBody>
                    </NavDrawer>
                 
                    <div className={styles.content}>
                  
                        <MasterContainer>
                    
                        <AppBar openHam={isOpen} setOpenHam={setIsOpen} icon={renderHamburgerWithToolTip()} />
                            {children}

                        </MasterContainer>

                    </div>
                </div>}
            </div>

        </FluentProvider>
    );
};
export default Dashboard;

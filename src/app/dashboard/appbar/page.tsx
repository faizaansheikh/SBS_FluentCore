import * as React from "react";
import {
  makeStyles,
  Button,
  Divider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  tokens,
  mergeClasses,
  Overflow,
  OverflowItem,
  useIsOverflowGroupVisible,
  useIsOverflowItemVisible,
  useOverflowMenu,
  Title1,
  Body2,
  Avatar,
} from "@fluentui/react-components";
import { ArrowExitFilled, GridDotsRegular, LauncherSettingsFilled, QuestionFilled, TextCollapseFilled } from "@fluentui/react-icons";
import { openDialog } from "@/app/config/MasterContainer";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    minWidth: 0,
    overflow: "hidden",
  },

  resizableArea: {
    minWidth: "200px",
    maxWidth: "800px",
    // border: `2px solid ${tokens.colorBrandBackground}`,
    padding: "0px 10px 0px 10px",
    position: "relative",
    resize: "horizontal",
    "::after": {
      //   content: `'Resizable Area'`,
      position: "absolute",
      padding: "1px 4px 1px",
      top: "-2px",
      left: "-2px",
      fontFamily: "monospace",
      fontSize: "15px",
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: "1px",
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

export const AppBar = (props: any) => {
  const { openHam, setOpenHam } = props
  const styles = useStyles();

  return (
    // <Overflow padding={40}>
    //   <div className={mergeClasses(styles.container, styles.resizableArea)}>
    //     <OverflowItem id={"1"} groupId={"1"}>
    //       <Button>Item 1</Button>
    //     </OverflowItem>
    //     <OverflowGroupDivider groupId={"1"} />
    //     <OverflowItem id={"2"} groupId={"2"}>
    //       <Button>Item 2</Button>
    //     </OverflowItem>
    //     <OverflowGroupDivider groupId={"2"} />
    //     <OverflowItem id={"3"} groupId={"3"}>
    //       <Button>Item 3</Button>
    //     </OverflowItem>
    //     <OverflowItem id={"4"} groupId={"3"}>
    //       <Button>Item 4</Button>
    //     </OverflowItem>
    //     <OverflowGroupDivider groupId={"3"} />
    //     <OverflowItem id={"5"} groupId={"4"}>
    //       <Button>Item 5</Button>
    //     </OverflowItem>
    //     <OverflowItem id={"6"} groupId={"4"}>
    //       <Button>Item 6</Button>
    //     </OverflowItem>
    //     <OverflowItem id={"7"} groupId={"4"}>
    //       <Button>Item 7</Button>
    //     </OverflowItem>
    //     <OverflowGroupDivider groupId={"4"} />
    //     <OverflowItem id={"8"} groupId={"5"}>
    //       <Button>Item 8</Button>
    //     </OverflowItem>
    //     <OverflowMenu
    //       itemIds={[
    //         "1",
    //         "divider-1",
    //         "2",
    //         "divider-2",
    //         "3",
    //         "4",
    //         "divider-3",
    //         "5",
    //         "6",
    //         "7",
    //         "divider-4",
    //         "8",
    //       ]}
    //     />
    //   </div>
    // </Overflow>
    <div style={{
      position: 'sticky',
      top: 0, right: 0, bottom: 0, left: 0, backgroundColor: tokens.colorNeutralBackground1Pressed, width: '100%', height: '50px', marginBottom: '0px',
      borderRadius: "0px", display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      {!openHam ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <GridDotsRegular onClick={() => setOpenHam(true)} style={{ fontSize: '30px', marginLeft: '10px', marginRight: '20px', cursor: 'pointer' }} />
        <Body2 className="text-center  font-semibold" style={{ fontWeight: 500, fontSize: '22px' }}>SBS Smart Business Solutions</Body2>
      </div> : <Body2 className="text-center font-semibold pl-[10px]" style={{ fontWeight: 500, fontSize: '18px' }}>SBS Smart Business Solutions</Body2>}

      <div>
        <LauncherSettingsFilled style={{ fontSize: '25px', marginRight: '10px', cursor: 'pointer' }} />
        <QuestionFilled style={{ fontSize: '25px', marginRight: '10px', cursor: 'pointer' }} />
        <Avatar style={{ marginRight: '10px', cursor: 'pointer' }}
          color="anchor"
          initials="A"
          name="Admin"
          active="active"
          activeAppearance="ring"
          onClick={() => {
            openDialog()
          }}
        />

      </div>


    </div>
  );
};

const OverflowGroupDivider: React.FC<{
  groupId: string;
}> = (props) => {
  const isGroupVisible = useIsOverflowGroupVisible(props.groupId);

  if (isGroupVisible === "hidden") {
    return null;
  }

  return (
    <Divider
      vertical
      appearance="brand"
      style={{ flexGrow: 0, paddingRight: "4px", paddingLeft: "4px" }}
    />
  );
};

const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } =
    useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={ref}>+{overflowCount} items</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {itemIds.map((i) => {
            // This is purely a simplified convention for documentation examples
            // Could be done in other ways too
            if (typeof i === "string" && i.startsWith("divider")) {
              const groupId = i.split("-")[1];
              return <OverflowMenuDivider key={i} id={groupId} />;
            }
            return <OverflowMenuItem key={i} id={i} />;
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const OverflowMenuItem: React.FC<{ id: string }> = (props) => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem>Item {id}</MenuItem>;
};

const OverflowMenuDivider: React.FC<{
  id: string;
}> = (props) => {
  const isGroupVisible = useIsOverflowGroupVisible(props.id);

  if (isGroupVisible === "visible") {
    return null;
  }

  return <MenuDivider />;
};
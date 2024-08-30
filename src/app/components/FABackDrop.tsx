import React from "react";

const FABackDrop = ({ show,children }:any) => {
  const backdropStyle:any = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  };

  return show ? <div style={backdropStyle} >{children}</div> : null;
};

export default FABackDrop;

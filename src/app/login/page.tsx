"use client"
// import { Typography, Box } from "@mui/material";
import { BAButton } from "../components/BAButton";
// import BAInput from "../components/BAInput";
import { BAInput } from "../components/BAInput";
import { useEffect, useState } from "react";
// import background from "../assets/images/Login.jpg";
import background from '../assets/images/Login.jpg'
import { useRouter } from "next/navigation";
// import { LoginApi } from "../config/apimethods";
// import { alert } from "../config/MasterContainer";
import { Provider, useDispatch, useSelector } from "react-redux";
// import { add } from "../config/redux/loginslice";
import { add } from '../config/redux/loginslice'
import logo from "../assets/images/logo.png";
// import BASwitch from "../components/BASwitch";
import { customDecrypt, customEncrypt } from "../config/helpers";
import { LoginApi } from "../config/apimethods";

import store from '../config/redux/store'
import Image from "next/image";
import {
    Input,
    Label,
    makeStyles,
    useId,
    tokens,
    mergeClasses,
    Switch,
    FluentProvider,
    teamsLightTheme,
} from "@fluentui/react-components";
const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",  
        maxWidth: "100%",
        "> div": { display: "flex", flexDirection: "column", gap: "0px" },
    },
    field: {
        display: "grid",
        gridRowGap: tokens.spacingVerticalXXS,
        marginTop: '14px',
        marginLeft:'6px',
        marginRight:'6px',
        // padding: tokens.spacingHorizontalMNudge,
    },
  
});
export default function Login() {
    const [model, setModel] = useState<any>({});
    const [property, setProperty] = useState({
        loading: false,
    });
    const [savePassword, setSavePassword] = useState(false);
    const loginDT = useSelector((a: any) => a.login);

    const dispatch = useDispatch();

    const navigate = useRouter();

    const loginUser = () => {
        if (!model.UserName || !model.Password) {
            alert("User Name & Password is Required");
            return;
        }
        setProperty({ ...property, loading: true });

        LoginApi("Security/Login", model)
            .then((res: any) => {
                if (res.isSuccessfull) {
                    setProperty({ ...property, loading: false });
                    alert("Login Successfully");

                    localStorage.setItem("EncRoles", customEncrypt(res.data.Roles));
                    localStorage.setItem("webtoken", res.data.webtoken);
                    localStorage.setItem(
                        "isAuthenticated",
                        JSON.stringify(res.data.isAuthenticated)
                    );
                    localStorage.setItem("webtoken", JSON.stringify(res.data.webtoken));
                    localStorage.setItem(
                        "UserID",
                        JSON.stringify(res.data.UserData.UserID)
                    );
                    localStorage.setItem(
                        "UserName",
                        JSON.stringify(res.data.UserData.UserName)
                    );
                    localStorage.setItem(
                        "ProfilePic",
                        JSON.stringify(res.data.UserData.ProfilePic)
                    );
                    localStorage.setItem(
                        "Designation",
                        JSON.stringify(res.data.UserData.Designation)
                    );
                    localStorage.setItem(
                        "ContactNo",
                        JSON.stringify(res.data.UserData.ContactNo)
                    );
                    localStorage.setItem(
                        "Email",
                        JSON.stringify(res.data.UserData.Email)
                    );
                    localStorage.setItem(
                        "CompID",
                        JSON.stringify(res.data.UserData.CompID)
                    );
                    localStorage.setItem(
                        "CompCode",
                        JSON.stringify(res.data.UserData.CompCode)
                    );
                    localStorage.setItem(
                        "CompanyPic",
                        JSON.stringify(res.data.UserData.CompanyPic)
                    );

                    localStorage.setItem("DB", JSON.stringify(res.data.UserData.DB));
                    localStorage.setItem(
                        "CompName",
                        JSON.stringify(res.data.UserData.CompName)
                    );
                    localStorage.setItem("Menu", JSON.stringify(res.data.Menu));
                    localStorage.setItem("Roles", JSON.stringify(res.data.Roles));
                    //  navigate('/Dashboard', { replace: true });
                    localStorage.setItem(
                        "Segments",
                        JSON.stringify(res.data.UserData.Segments)
                    );

                    localStorage.setItem(
                        "DefaultCurSymbol",
                        JSON.stringify(res.data.UserData.DefaultCurSymbol)
                    );
                    localStorage.setItem(
                        "DefaultCurDesc",
                        JSON.stringify(res.data.UserData.DefaultCurDesc)
                    );
                    localStorage.setItem(
                        "SegSize1",
                        JSON.stringify(res.data.UserData.SegSize1)
                    );
                    localStorage.setItem(
                        "SegSize2",
                        JSON.stringify(res.data.UserData.SegSize2)
                    );
                    localStorage.setItem(
                        "SegSize3",
                        JSON.stringify(res.data.UserData.SegSize3)
                    );
                    localStorage.setItem(
                        "SegSize4",
                        JSON.stringify(res.data.UserData.SegSize4)
                    );
                    localStorage.setItem("Seg1", JSON.stringify(res.data.UserData.Seg1));
                    localStorage.setItem("Seg2", JSON.stringify(res.data.UserData.Seg2));
                    localStorage.setItem("Seg3", JSON.stringify(res.data.UserData.Seg3));
                    localStorage.setItem("Seg4", JSON.stringify(res.data.UserData.Seg4));
                    localStorage.setItem(
                        "EnableMultiEntity",
                        JSON.stringify(res.data.UserData.EnableMultiEntity)
                    );
                    localStorage.setItem(
                        "DefaultCurCode",
                        JSON.stringify(res.data.UserData.DefaultCurCode)
                    );
                    localStorage.setItem(
                        "DefaultCurDesc",
                        JSON.stringify(res.data.UserData.DefaultCurDesc)
                    );
                    localStorage.setItem(
                        "QtyDecimalPlaces",
                        JSON.stringify(res.data.UserData.QtyDecPlaces)
                    );
                    localStorage.setItem(
                        "DecimalPlaces",
                        JSON.stringify(res.data.UserData.DecPlaces)
                    );
                    localStorage.setItem(
                        "MultiUOM",
                        JSON.stringify(res.data.UserData.MultiUOM)
                    );
                    localStorage.setItem(
                        "EditGRPrice",
                        JSON.stringify(res.data.UserData.EditGRPrice)
                    );

                    localStorage.setItem(
                        "FinYear",
                        JSON.stringify(res.data.UserData.FinYear)
                    );
                    localStorage.setItem(
                        "FinStartDate",
                        JSON.stringify(res.data.UserData.FinStartDate)
                    );
                    localStorage.setItem(
                        "FinEndDate",
                        JSON.stringify(res.data.UserData.FinEndDate)
                    );

                    localStorage.setItem(
                        "Currency",
                        JSON.stringify(res.data.UserData.Currency)
                    );

                    const Locations = {
                        Locations: res.data.UserData.Locations,
                        DefaultLocationCode: res.data.UserData.DefaultLocationCode,
                        DefaultLocation: res.data.UserData.DefaultLocation,
                    };

                    localStorage.setItem("Locations", JSON.stringify(Locations));
                    if (savePassword) {
                        let credentials = customEncrypt(model);
                        localStorage.setItem("savedCredentials", credentials);
                    }
                    dispatch(add(res.data));
                    navigate.push("/dashboard");
                } else {
                    alert(res.error);
                    setProperty({ ...property, loading: false });
                }
            })
            .catch((err) => {
                alert(err.message);
                setProperty({ ...property, loading: false });
            });
        // navigate('/', { replace: true })
    };
    useEffect(() => {
        if (loginDT.auth) {
            navigate.push("/dashboard");
        } else {
            let credentials = localStorage.getItem("savedCredentials");
            if (credentials) {
                let val = customDecrypt(credentials);
                setModel({ ...val });
            }
        }
    }, []);
   

    const styles = useStyles();

    return (
        <>
            <FluentProvider theme={teamsLightTheme}>



                <div
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background.src})`,
                        minHeight: '100%',
                        position: 'fixed',
                        right: '0px',
                        left: '0px',
                        height: '100vh',
                        backgroundPosition: 'cover',
                        backgroundSize: 'cover',
                        backdropFilter:''
                    }}
                >
                    <div
                        style={{
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            zIndex: 200
                        }}
                    // className="h-100 semi-transparent d-flex justify-content-center align-items-center flex-column"
                    >
                        <div
                            // component="form"
                            onSubmit={(e: any) => {
                                e.preventDefault();
                                loginUser();
                            }}

                            style={{ width: 320, height: 400, backgroundColor: 'white', padding: '4px', zIndex: 5000 ,borderBottom:'6px solid yellow'}}
                        >
                            <div
                                style={{
                                    textAlign: 'center', marginTop: '30px', paddingBottom: '3px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image width={150} src={logo} alt="Finosys PVT LTD" />
                            </div>

                            <p style={{ textAlign: 'center', fontSize: '29px', marginTop: '15px', fontWeight: 300 }}>
                                Login
                            </p>
                            <div style={{ padding: '0px 10px 0px 7px' }}>


                                <div className={styles.field}>
                                    <Label>
                                        Username
                                    </Label>
                                    <Input
                                        appearance="underline"
                                        style={{ fontSize: '15px' }}
                                        value={model.UserName}
                                        required={true}                                      
                                        onChange={(e) =>
                                          setModel({ ...model, UserName: e.target.value })
                                        }
                                    />
                                </div>

                                <div className={styles.field}>
                                    <Label>
                                        Password
                                    </Label>
                                    <Input
                                        appearance="underline"
                                        type="password"
                                        required={true}
                                        value={model.Password}
                                        onChange={(e) =>
                                          setModel({ ...model, Password: e.target.value })
                                        }
                                    />
                                </div>




                                <div className={styles.field}>
                                    <Switch label="Save Password" />
                                    {/* <BASwitch
                onChange={(e:any) => setSavePassword(e.target.checked)}
                label="Save Password"
              /> */}
                                </div>
                                <div  style={{marginTop:'10px',display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <BAButton
                                        style={{ fontSize: '20px', fontWeight: 'lighter', backgroundColor: '#4f52b2', width: 280, color: 'white', padding: '6px 0px 7px 0px', marginTop: '10px' }}
                                        type="submit"
                                        loading={property.loading}
                                        onClick={loginUser}
                                        label="Login"
                                        fullWidth={true}
                                    />
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </FluentProvider>
        </>
    );
}

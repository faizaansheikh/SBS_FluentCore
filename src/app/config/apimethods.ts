import axios from "axios";
// import { displayError } from "./MasterContainer";

// Create axios instance
const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});
console.log(process.env)
// Retrieve and parse values from localStorage
const token: string | null = localStorage.getItem("webtoken")
    ? JSON.parse(localStorage.getItem("webtoken") as string)
    : null;
const companyId: string | null = localStorage.getItem("CompID")
    ? JSON.parse(localStorage.getItem("CompID")  as string)
    : null;
const companyCode: string | null = localStorage.getItem("CompCode")
    ? JSON.parse(localStorage.getItem("CompCode")  as string)
    : null;
const DBName: string | null = localStorage.getItem("DB")
    ? JSON.parse(localStorage.getItem("DB")  as string)
    : null;
const session: string | null = localStorage.getItem("Session")
    ? JSON.parse(localStorage.getItem("Session")  as string)
    : null;
const userID: string | null = localStorage.getItem("userID") || "";
const userName: string | null = localStorage.getItem("UserName")
    ? JSON.parse(localStorage.getItem("UserName")  as string)
    : null;

// Add request interceptor
instance.interceptors.request.use(
    (config: any) => {
        // Set headers
        config.headers.Authorization = `Bearer ${localStorage.getItem("webtoken")}`;
        config.headers["CompID"] = companyId || "";
        config.headers["Session"] = session || "";
        config.headers["CompCode"] = companyCode || "";
        config.headers["DBName"] = DBName || "";
        config.headers["UserID"] = userID || "";
        config.headers["UserName"] = userName || "";
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        if (response.data.message === "jwt expired") {
            //   displayError("Session Expired. Please Login Again.", "error");
            window.location.href = "/login";
        }
        return response;
    },
    (error) => Promise.reject(error)
);

// Function for GET request
export const Get = (endPoint: any, id?: any, params?: any) => {
    return new Promise((resolve, reject) => {
        instance
            .get(`${endPoint}${id ? "/" + id : ""}`, { params })
            .then((res) => {
                if (res.data.isSuccessfull) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// Function for POST request
export const Post = (endPoint: any, body: any, id?: any) => {
    return new Promise((resolve, reject) => {
        instance
            .post(`${endPoint}${id ? "/" + id : ""}`, body)
            .then((res) => {
                if (res.data.isSuccessfull) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
            .catch((err) => {
                reject(err.response?.data || err);
            });
    });
};

// Function for Login API
export const LoginApi = (endPoint: any, body?: any, id?: any) => {
    return new Promise((resolve, reject) => {
        instance
            .post(endPoint, body)
            .then((res) => {
                if (res.data.isSuccessfull) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
            .catch((err) => {
                reject(err.response?.data || err);
            });
    });
};

// Function for PUT request
export const Put = (endPoint: any, body: any, id: any) => {
    return new Promise((resolve, reject) => {
        instance
            .put(`${endPoint}${id ? "/" + id : ""}`, body)
            .then((res) => {
                if (res.data.isSuccessfull) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// Function for DELETE request
export const Delete = (endPoint: any, id: any) => {
    return new Promise((resolve, reject) => {
        instance
            .delete(`${endPoint}${id ? "/" + id : ""}`)
            .then((res) => {
                if (res.data.isSuccessfull) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default instance;

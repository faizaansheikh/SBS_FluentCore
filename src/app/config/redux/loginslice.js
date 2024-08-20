import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: 'Login',
    initialState: {
        auth: false,
        loginData: {}
    },
    reducers: {
        add: (state, action) => {
            state.auth = true
            state.loginData = action.payload
        },
        del: (state, action) => {
            state.auth = false;
            state.loginData = {}
        }
    }
})


export const { add, del } = LoginSlice.actions
export default LoginSlice.reducer
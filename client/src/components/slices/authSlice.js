import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        otp: '',
        hash: '',
        number: '',
        expires: '',
        isAuth: false,
    },
    reducers: {
        setAuth: (state, action) => {
            state.otp = action.payload.otp
            state.hash = action.payload.hash
            state.number = action.payload.number
            state.expires = action.payload.expires
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setAuth, setIsAuth } = authSlice.actions

export default authSlice.reducer
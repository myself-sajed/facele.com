import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: 87465789,
    },
    reducers: {

        setLogin: (state, action) => {
            state.isLoggedIn = action.payload
        },


    },
})

// Action creators are generated for each case reducer function
export const { setLogin, } = loginSlice.actions

export default loginSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../components/slices/authSlice'
import userSlice from '../components/slices/userSlice'
import loginSlice from '../components/slices/loginSlice'

export default configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        login: loginSlice,
    },
})
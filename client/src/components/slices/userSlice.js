import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        number: '',
        username: '',
        avatar: '',
        isActivated: '',
        imageUrl: '',
        setAuth: '',
        myuser: '',
        room: '',
    },
    reducers: {

        setUserNumber: (state, action) => {
            state.number = action.payload
        },
        setUserUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setIsActivated: (state, action) => {
            state.isActivated = action.payload;
        },
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },
        setIsAuth: (state, action) => {
            state.setAuth = action.payload;
        },
        setMyUser: (state, action) => {
            state.myuser = action.payload;
        },
        setRoom: (state, action) => {
            state.room = action.payload
        }


    },
})

// Action creators are generated for each case reducer function
export const { setUserAvatar, setRoom, setUserUsername, setUserNumber, setIsActivated, setImageUrl, setIsAuth, setMyUser, } = userSlice.actions

export default userSlice.reducer
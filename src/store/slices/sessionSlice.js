import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        user: null,
        counter: 0,
    },
    reducers: {
        setSession: (state, action) => {
            state.user = action.payload
        },
        increment: state => {
            state.counter += 1
        }
    }
})

export const { setSession, increment } = sessionSlice.actions
export const userSlice = state => state.user.user
export const counterSlice = state => state.user.counter
export default sessionSlice.reducer
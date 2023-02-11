import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        notificationChange: (state, action) => {
            return action.payload
        }
    }
})

export const { notificationChange } = notificationSlice.actions

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(notificationChange(text))
        setTimeout(() => {
            dispatch(notificationChange(''))
        }, time * 1000)
    }
}
export default notificationSlice.reducer
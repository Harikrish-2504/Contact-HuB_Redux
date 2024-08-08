import {configureStore} from '@reduxjs/toolkit'
import contactReducers from './Redux/ContactSlice'

const store = configureStore({
    reducer:{
        contacts:contactReducers,
    }
})
export default store;
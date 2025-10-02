import {configureStore} from '@reduxjs/toolkit'
import sliceUser from '../slice/itemSlice'
const store = configureStore({
    reducer:{
        users:sliceUser
    }
})

export default store
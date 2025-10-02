import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const addUser = createAsyncThunk('users/add', async (newUser) => {
  const res = await axios.post('http://localhost:4000/users/add', newUser);
  return res.data;
});

export const login = createAsyncThunk('users/login', async (cred) => {
  const res = await axios.post('http://localhost:4000/users/login', cred);
  return res.data;
});


const slice = createSlice({
    name:'users',
    initialState:{
        user:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addUser.pending,(state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(addUser.fulfilled,(state,action)=>{
                state.loading = false
                state.user = state.user.push(action.payload)
            })
            .addCase(addUser.rejected,(state,action)=>{
                state.loading = false,
                state.error = action.error.message
            })
    }
})

export default slice.reducer
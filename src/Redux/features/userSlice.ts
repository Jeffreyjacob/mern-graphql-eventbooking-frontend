import { UserType } from "@/lib/type"
import  {createSlice,PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    user:UserType | null,
    auth:boolean
}

const initialState:InitialState = {
   user:null,
   auth:false
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        SaveUser:(state,action:PayloadAction<UserType>)=>{
           state.user = action.payload,
           state.auth = true
        },
        LogOut:(state)=>{
            state.user = null,
            state.auth = false
        }
    }
})

export const {SaveUser,LogOut} = userSlice.actions;
export default userSlice.reducer
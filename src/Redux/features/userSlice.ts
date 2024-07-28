import { UserType } from "@/lib/type"
import  {createSlice,PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    user:UserType | null,
    auth:boolean
}

const initialState:InitialState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
  auth: JSON.parse(localStorage.getItem("auth") || "false"),
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        SaveUser:(state,action:PayloadAction<UserType>)=>{
           state.user = action.payload,
           state.auth = true;
           localStorage.setItem("user",JSON.stringify(action.payload))
           localStorage.setItem("auth","true")
        },
        LogOut:(state)=>{
            state.user = null,
            state.auth = false;
            localStorage.removeItem("user");
            localStorage.setItem("auth", "false");
        }
    }
})

export const {SaveUser,LogOut} = userSlice.actions;
export default userSlice.reducer
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { useQuery } from "@apollo/client";
import { AUTHUSER } from "./graphql/quries/userQuery";
import {Loader2} from "lucide-react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {SaveUser} from "./Redux/features/userSlice"
import { RootState } from "./Redux/store";
import CreateEventPage from "./pages/CreateEventPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "./layout/Layout";
import EventDetailPage from "./pages/EventDetailPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const dispatch = useDispatch()
   const {data,loading} = useQuery(AUTHUSER)
   const [initialLoading, setInitialLoading] = useState(true);
    useEffect(()=>{
      if(data){
        dispatch(SaveUser(data.authUser))
      }
      setInitialLoading(false);
    },[data,dispatch])
    const auth = useSelector((state:RootState)=>state.user.auth)  
   if(loading || initialLoading){
    return(<div className="w-full min-h-screen flex justify-center items-center">
           <Loader2 className="text-black w-7 h-7 animate-spin"/>
    </div>)
   }

  return (
   <Routes>
    <Route path="/login" element={auth ? <Navigate to="/" replace/>:<LoginPage/>  }/>
    <Route path="/signup" element={!auth ? <SignupPage/>: <Navigate to="/"/> }/>
    <Route path="/forgetPassword" element={!auth ? <ForgetPassword/> : <Navigate to="/"/>}/>
    <Route path="/resetPassword/:resetToken" element={!auth ? <ResetPassword/>: <Navigate to="/"/>}/>
    <Route path="/eventDetails/:id" element={<Layout>
      <EventDetailPage/>
    </Layout> }/>
    <Route path="/" element={<Layout>
      <Homepage/>
      </Layout> }/>
    
    <Route element={<ProtectedRoutes/>}>

    <Route path="/createEvent" element={<Layout>
      <CreateEventPage/>
    </Layout>}/>
    <Route path="/updateEvent/:id" element={<Layout>
      <UpdateEventPage/>
    </Layout>} />
    <Route path="/profile" element={<Layout>
     <ProfilePage/>
    </Layout>}/>

    </Route>

   </Routes>
  )
}

export default App

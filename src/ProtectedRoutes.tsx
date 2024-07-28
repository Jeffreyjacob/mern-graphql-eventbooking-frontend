import { useSelector } from "react-redux"
import { RootState } from "./Redux/store"
import { Navigate,Outlet, useLocation } from "react-router-dom"

const ProtectedRoutes = () => {
    const location = useLocation()
    const auth = useSelector((state:RootState)=>state.user.auth)
  return auth ? <Outlet/> : <Navigate to={"/login"} state={{from:location.pathname}} replace />
}

export default ProtectedRoutes
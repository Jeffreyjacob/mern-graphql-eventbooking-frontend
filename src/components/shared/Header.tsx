import { useSelector } from "react-redux"
import { Button } from "../ui/button"
import Logo from "./Logo"
import { RootState } from "@/Redux/store"
import { useNavigate } from "react-router-dom"
import UserIcon from "./UserIcon"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const Header = () => {
    const auth = useSelector((state: RootState) => state.user.auth)
    const navigate = useNavigate()
    const [scrolled,setScrolled] = useState(false)
    useEffect(()=>{
         const handleScrolled = ()=>{
           setScrolled(window.scrollY > 10)
         }
         window.addEventListener("scroll",handleScrolled)
         return ()=> window.removeEventListener("scroll",handleScrolled)
    },[])
    return (
        <div className={cn(`container py-3 w-full bg-backgroundGrey/70 transition-all`,{
            "backdrop-blur-lg":scrolled
        })}>
            <div className=" w-full flex justify-between items-center px-4 lg:px-14">
                <Logo />

                <div>
                    {
                        auth ? <div className="flex gap-3 lg:gap-5 items-center">
                                <Button className="bg-primaryBlue hover:bg-primaryBlue rounded-xl text-[13px] hidden lg:block" onClick={()=>navigate("/createEvent")}>
                                    Create Event
                                </Button>
                               <UserIcon />
                              </div>
                            : <div className="flex gap-2 items-center">
                                <Button variant="outline" onClick={() => navigate("/login")}>
                                    Login
                                </Button>
                                <Button className="bg-primaryBlue lg:px-5 px-3 lg:text-[16px] hover:bg-primaryBlue/95" onClick={() => navigate("/signup")}>
                                    Signup
                                </Button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
import { UserRound } from "lucide-react"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { useMutation } from "@apollo/client"
import { LOGOUT } from "@/graphql/mutations/userMutation"
import { LogOut } from "@/Redux/features/userSlice"
import { toast } from "sonner"

const UserIcon = () => {
    const [logout,{client}] = useMutation(LOGOUT,{
        refetchQueries:["AuthUser"]
    })
    const dispatch = useDispatch()
   const handleLogout = async ()=>{
      try{
        await logout()
         dispatch(LogOut())
        client.resetStore()
      }catch(error){
         if(error instanceof Error){
            toast.error(error.message)
         }
      }
   }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="p-3 rounded-full bg-gray-100">
                    <UserRound className="w-5 h-5 " />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link to="/profile">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="lg:hidden">
                    <Link to="/createEvent">
                        Create an event
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="lg:hidden"/>
                <DropdownMenuItem asChild className=" focus:bg-primaryBlue">
                    <Button className="bg-primaryBlue hover:bg-primaryBlue w-full hover:border-none" onClick={handleLogout}>
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserIcon
import { Ellipsis, FilePenLine } from "lucide-react"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "../ui/dropdown-menu"
import DeleteEvent from "./DeleteEvent"
import { EventType } from "@/lib/type"
import { useNavigate } from "react-router-dom"

type Props = {
    event:EventType
}
const EventOption = ({event}:Props) => {
    const navigate = useNavigate()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className=" focus:border-none focus:outline-none ">
                <Ellipsis className="w-5 h-5 text-grey600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <div className="w-full flex justify-between text-primaryBlue cursor-pointer" onClick={()=>navigate(`/updateEvent/${event._id}`)}>
                        <FilePenLine className="text-primaryBlue w-5 h-5" />
                        <span>Edit</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full">
                    <DeleteEvent id={event._id} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default EventOption
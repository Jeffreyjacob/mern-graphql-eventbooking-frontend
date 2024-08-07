import { EventType } from "@/lib/type"
import { Card } from "../ui/card";
import { format } from "date-fns"
import { Link } from "react-router-dom";
import EventOption from "./EventOption";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";


type Props = {
    event: EventType
}
const EventCard = ({ event }: Props) => {
    const user = useSelector((state:RootState)=>state.user.user)
    console.log(user?._id,event.organizerId)
    const isAuthorizated = user?._id === event.organizerId
    return (
        <Card className="w-full flex flex-col p-3  rounded-lg relative max-sm:w-[300px]">
            <Link to={`/eventDetails/${event._id}`} replace>
                <img src={event.imageUrl} className="w-full h-[200px] object-cover rounded-lg" />
            </Link>
                {
                    event.isFree && <div className=" absolute top-6 left-5 text-primaryBlue text-[10px] py-1 px-3 rounded-lg bg-white">
                        Free
                    </div>
                }
                <div className="flex flex-col gap-3 mt-3">
                    <div className="w-full flex justify-between items-center">
                    <h4 className="text-[16px] font-normal text-black">
                        {event.title}
                    </h4>
                     {isAuthorizated && <EventOption event={event}/>}
                    </div>
                    <span className="text-[12px] font-normal text-primaryBlue">
                        {format(event.startDate, "PPP")}
                    </span>
                    <span className="text-[12px] text-grey600">
                        {event.location}
                    </span>
                </div>
        </Card>

    )
}

export default EventCard
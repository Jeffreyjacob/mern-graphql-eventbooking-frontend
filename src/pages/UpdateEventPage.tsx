import EventForm from "@/components/shared/EventForm"
import { EVENT_BY_ID } from "@/graphql/quries/eventQuery"
import { useQuery } from "@apollo/client"
import { Loader2 } from "lucide-react"
import { useParams } from "react-router-dom"


const UpdateEventPage = () => {
    const {id} = useParams()
    
    const {data,loading} = useQuery(EVENT_BY_ID,{
        variables:{id:id}
    })
    if(loading){
        return <div className="w-full min-h-screen flex justify-center items-center">
           <Loader2 className="text-black animate-spin"/>
        </div>
    }
    return (
        <div className="w-full px-4 md:px-10">
            <h5 className=" text-[26px] md:text-[36px] text-black text-center font-bold mt-5 mb-7">Update Event</h5>
            <div className="w-full flex flex-col justify-center items-center">
                <EventForm type="Update" event={data?.event} eventId={id}/>
            </div>
        </div>
    )
}

export default UpdateEventPage
import EventForm from "@/components/shared/EventForm"
import { createformDefault } from "@/lib/type"
import { RootState } from "@/Redux/store"
import { useSelector } from "react-redux"



const CreateEventPage = () => {
    const user = useSelector((state:RootState)=> state.user.user)
    if(!user){
        return
    }
    console.log(user)
  return (
    <div className="w-full px-4 md:px-10">
       <h5 className=" text-[26px] md:text-[36px] text-black text-center font-bold mt-5 mb-7">Create Event</h5>
         <div className="w-full flex flex-col justify-center items-center">
            <EventForm type="Create" event={createformDefault}/>
         </div>
    </div>
  )
}

export default CreateEventPage
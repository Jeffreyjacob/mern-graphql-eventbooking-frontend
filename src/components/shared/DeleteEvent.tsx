import { Trash } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { toast } from "sonner"
import { useMutation } from "@apollo/client"
import { DELETE_EVENT } from "@/graphql/mutations/eventMutation"
import { GetAllEventResponse } from "./EventForm"
import { GET_ALL_EVENT } from "@/graphql/quries/eventQuery"


const DeleteEvent = ({id}:{id:string}) => {
    const [deleteEvent] = useMutation(DELETE_EVENT,{
        update(cache){
            const existingEvent = cache.readQuery<GetAllEventResponse>({query:GET_ALL_EVENT})
            const newEvent = existingEvent?.events?.filter((event)=>event._id !==id)
            if(existingEvent){
                cache.writeQuery({
                    query:GET_ALL_EVENT,
                    data:{events:newEvent}
                })
            }
        }
    })
    const handleDeleteEvent = async()=>{
        try{
          await deleteEvent({
            variables:{eventId:id}
          })
          toast.success("Event Deleted")
        }catch(error){
          if(error instanceof Error){
            toast.error(error.message)
          }else{
            toast.error("Unexpected error")
          }
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="w-full flex justify-between text-red-600 px-2 cursor-pointer">
                <Trash className="text-red-600 w-5 h-5" />
                    <span>Delete</span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this event.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-primaryBlue hover:bg-primaryBlue"
                    onClick={handleDeleteEvent}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteEvent
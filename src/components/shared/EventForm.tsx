import { EventType, eventTypeData, UpdateEventInputType } from "@/lib/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { Input } from "../ui/input"
import { DatePickerDemo } from "./DatePicker"
import { Checkbox } from "../ui/checkbox"
import SelectBox from "./SelectBox"
import { Textarea } from "../ui/textarea"
import { useRef, useState } from "react"
import { Button } from "../ui/button";
import uploadSvg from '@/assets/images/upload.svg'
import { useMutation } from "@apollo/client"
import { CREATE_EVENT, UPDATE_EVENT } from "@/graphql/mutations/eventMutation";
import { toast } from "sonner"
import { GET_ALL_EVENT } from "@/graphql/quries/eventQuery"

type Props = {
    type: "Create" | "Update",
    event: UpdateEventInputType,
    eventId?: string,
}

type GetAllEventResponse = {
    events:EventType[]
}

const formSchema = z.object({
    title: z.string().min(1, "Enter an event title"),
    location: z.string().min(1, "Enter the event location"),
    startDate: z.date(),
    endDate: z.date(),
    imageUrl: z.string().optional(),
    description: z.string(),
    eventType: z.string(),
    price: z.string(),
    isFree: z.boolean()
})

const EventForm = ({ type, event, eventId}: Props) => {
    const formValue = type === "Update" ? {...event,
        price:event.price.toString(),
        startDate:new Date(event.startDate),endDate:new Date(event.endDate)} : event
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formValue
    })
    const [imageFile, setImagefile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState("")
    const imageRef = useRef<HTMLInputElement | null>(null)
    const handleImageChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0]
            setImagefile(file)
            const url = URL.createObjectURL(file)
            setImageUrl(url)
        }
    }
    const [createEvent,{loading:Creating}] = useMutation(CREATE_EVENT,{
        update(cache,{data:{createEvent}}){

            const existingEvent = cache.readQuery<GetAllEventResponse>({query:GET_ALL_EVENT})
            if(existingEvent){
            cache.writeQuery({
                query:GET_ALL_EVENT,
                data:{events:[...existingEvent.events,createEvent]}
            })
        }

        }
    })
    const [updateEvent,{loading:Updating}] = useMutation(UPDATE_EVENT)
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (type === "Create") {
           try{
            await createEvent({
                variables:{
                    input:{
                    title: values.title,
                    description:values.description,
                     isFree:values.isFree,
                     price:parseFloat(values.price),
                     location: values.location,
                     startDate: values.startDate,
                     endDate:values.endDate,
                     eventType:values.eventType,
                    },
                  imageFile:imageFile
                }
            })
            toast.success("Event Created")
            form.reset()
             setImageUrl("")
           }catch(error){
             if(error instanceof Error){
                 toast.error(error.message)
             }else{
                toast.error("Unexpected error creating event")
             }
           }
        }

        if (type === "Update") {
            console.log(values)
            try{
            await updateEvent({
                variables:{
                    input:{
                    eventId:eventId,
                     title: values.title,
                     description:values.description,
                     isFree:values.isFree,
                     price:parseFloat(values.price),
                     location: values.location,
                     startDate: values.startDate,
                     endDate:values.endDate,
                     eventType:values.eventType,
                    },
                  imageFile:imageFile
                }
            })
            toast.success("Event Updated")
            }catch(error){
                if(error instanceof Error){
                    toast.error(error.message)
                }else{
                    toast.error("Unexpected Error")
                }
            }
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full lg:w-[800px]">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" capitalize text-[12px] font-normal">Event Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your title " {...field}
                                    className=" placeholder:text-[#687C94] text-black w-full py-4" />
                            </FormControl>
                            <FormMessage className="text-[12px]" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" capitalize text-[12px] font-normal">Event Venue</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your location " {...field}
                                    className=" placeholder:text-[#687C94] text-black w-full py-4 " />
                            </FormControl>
                            <FormMessage className="text-[12px]" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" capitalize text-[12px] font-normal">Event Type</FormLabel>
                            <FormControl>
                                <SelectBox Data={eventTypeData}
                                    onChange={field.onChange}
                                    value={field.value}
                                    placeHolder="Choose event type" />
                            </FormControl>
                            <FormMessage className="text-[12px]" />
                        </FormItem>
                    )}
                />
                <div className="w-full flex gap-2">
                    <div className="w-[50%]">
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" capitalize text-[12px] font-normal">Start Date</FormLabel>
                                    <FormControl>
                                        <DatePickerDemo date={field.value} DateOnChange={(date: Date) => field.onChange(date)} />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-[50%]">
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" capitalize text-[12px] font-normal">End Date</FormLabel>
                                    <FormControl className="w-[50%]">
                                        <DatePickerDemo date={field.value} DateOnChange={(date: Date) => field.onChange(date)} />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="w-full flex gap-3 items-center h-full">
                    <div className="w-[50%]">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" capitalize text-[12px] font-normal">Event Price</FormLabel>
                                    <FormControl className="w-[50%]">
                                        <Input placeholder="Enter event price " {...field}
                                            className=" placeholder:text-[#687C94] text-black w-full py-4 " />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-[50%] h-full">
                        <FormField
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className='flex items-center'>
                                            <label htmlFor='isFree' className='whitespace-nowrap pr-3 leading-none 
                                                              peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                                Free Ticket
                                            </label>
                                            <Checkbox id='isFree'
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                                className='mr-2 h-5 w-5 border-2 border-primary-500' />

                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" capitalize text-[12px] font-normal">Event Image</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full">
                                    <div className="w-full h-[200px] bg-grey100 rounded-lg flex justify-center items-center" onClick={() => imageRef.current?.click()}>
                                        {
                                            (imageUrl || field.value) ? <img src={imageUrl || field.value}
                                                className="w-full h-full rounded-lg bg-cover" /> :
                                                <div className="flex-center flex-col py-5 text-grey-500">
                                                    <img src={uploadSvg} width={77} height={77} alt="file upload" />
                                                    <h3 className="mb-2 mt-2">Drag photo here</h3>
                                                    <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                                                </div>
                                        }
                                    </div>
                                    <input type="file"
                                        hidden
                                        ref={imageRef}
                                        onChange={(e) => handleImageChange(e.target.files)} />
                                </div>
                            </FormControl>
                            <FormMessage className="text-[12px]" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" capitalize text-[12px] font-normal">Event Description</FormLabel>
                            <FormControl className="w-[50%]">
                                <Textarea className=" placeholder:text-[#687C94] text-black w-full py-4" placeholder="type here..."
                                    {...field} />
                            </FormControl>
                            <FormMessage className="text-[12px]" />
                        </FormItem>
                    )}
                />
               {
                (Creating || Updating )? <Button className="bg-primaryBlue w-full " disabled>
                    {type === "Create" ? "Creating Event" : "Updating Event"}
                </Button>: <Button type="submit" className="bg-primaryBlue w-full ">
                     {type === "Create" ? "Create Event":"Update Event"}
                </Button>
               }
            </form>
        </Form>
    )
}

export default EventForm
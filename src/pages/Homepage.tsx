import homeImage from "@/assets/images/homeImage.png";
import { DatePickerDemo } from "@/components/shared/DatePicker";
import EventCard from "@/components/shared/EventCard";
import SelectBox from "@/components/shared/SelectBox";
import EventCardSkeleton from "@/components/shared/skeleton/EventCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GET_ALL_EVENT } from "@/graphql/quries/eventQuery";
import { EventType, eventTypeData } from "@/lib/type";
import { useQuery } from "@apollo/client";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


type SearchType = {
    eventType: string,
    location: string,
    when: Date
}
 
type EventCardType = {
   events:EventType[]
}

const Homepage = () => {
    const [searchOptions, setSearchOptions] = useState<SearchType>({
        eventType: "",
        location: "",
        when: new Date,
    })
    const handleEventType = (value: string) => {
        setSearchOptions((prevState) => ({
            ...prevState,
            eventType: value
        }))
    }
    const handleLocation = (value: string) => {
        setSearchOptions((prevState) => ({
            ...prevState,
            location: value
        }))
    }

    const handleDate = (date: Date) => {
        setSearchOptions((prevState) => ({
            ...prevState,
            when: date
        }))
    }
    const {data,loading} = useQuery<EventCardType>(GET_ALL_EVENT)
    return (
        <div className="lg:px-5">
            {/**Hero section */}
            <div className="w-full flex justify-center mt-2 h-[370px] rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${homeImage})` }}>
                <h2 className="text-white text-[35px] lg:text-[55px] font-bold mt-10 text-center">MADE FOR THOSE <br /> WHO DO</h2>
            </div>
            <div className="w-full flex justify-center">
                <div className="bg-navyBlue rounded-xl p-5 flex flex-col md:flex-row w-[75%] md:w-[90%] gap-5 -mt-44 md:-mt-14  items-center">
                    <div className="w-full md:w-[28%] flex flex-col gap-2">
                        <Label className="text-white text-[13px]  md:text-[14px]">Looking for</Label>
                        <SelectBox placeHolder="Choose event Type"
                            onChange={handleEventType}
                            value={searchOptions.eventType}
                            Data={eventTypeData} />
                    </div>

                    <div className="w-full md:w-[28%] flex flex-col gap-2">
                        <Label className="text-white text-[13px]  md:text-[14px]">Location</Label>
                        <Input placeholder="Enter Location"
                            className=" focus:border-none focus-within:border-none"
                            value={searchOptions.location}
                            onChange={(e) => handleLocation(e.target.value)} />
                    </div>

                    <div className="w-full md:w-[28%] flex flex-col gap-2">
                        <Label className="text-[13px]  md:text-[14px] text-white">When</Label>
                        <DatePickerDemo date={searchOptions.when}
                            DateOnChange={handleDate} />
                    </div>

                     <div className="flex-1 w-full h-full">
                     <Button className="bg-primaryBlue hover:bg-primaryBlue/90 flex gap-2 h-full w-full md:w-[85px]">
                        <Search className="w-5 h-5 text-white"/>
                        <span className="md:hidden">Search</span>
                     </Button>
                     </div>

                </div>
            </div>

            <div className="w-full px-4 md:px-10 mt-10">
                <h2 className="text-[26px] md:text-[36px] font-semibold text-black">
                    Upcoming <span className="text-primaryBlue">Events</span>
                </h2>

                <div className="w-full mt-6">
                   {
                    loading ? <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                         <EventCardSkeleton/>
                         <EventCardSkeleton/>
                         <EventCardSkeleton/>
                         <EventCardSkeleton/>
                         <EventCardSkeleton/>
                         <EventCardSkeleton/>
                    </div>:<div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center sm:justify-start">
                        {data?.events.map((event,index)=>(
                            <EventCard event={event} key={index}/>
                        ))}
                    </div>
                   }
                </div>

                <Button>
                    <Link to={`/updateEvent/66a22d10d7f6d7fac9d4db30`}>
                    Update
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Homepage
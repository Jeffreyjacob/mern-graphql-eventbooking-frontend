import EventCard from "@/components/shared/EventCard"
import EventCheckout from "@/components/shared/EventCheckout"
import MapComponent from "@/components/shared/Map"
import EventCardSkeleton from "@/components/shared/skeleton/EventCardSkeleton"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EVENT_BY_ID, SUGGESTED_EVENT } from "@/graphql/quries/eventQuery"
import { EventDetail, EventType } from "@/lib/type"
import { RootState } from "@/Redux/store"
import { useQuery } from "@apollo/client"
import { format } from "date-fns"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

type EventDetailType = {
  event: EventDetail
}
type SuggestedEventType = {
  suggestedEvent: EventType[]
}

const EventDetailPage = () => {
  const auth = useSelector((state: RootState) => state.user.auth)
  const { id } = useParams()
  const { data, loading } = useQuery<EventDetailType>(EVENT_BY_ID, { variables: { id: id } })
  const { data: SugEvent, loading: suggestedLoading } = useQuery<SuggestedEventType>(SUGGESTED_EVENT, { variables: { id: id } })
  if (!data) {
    return
  }
  if (loading) {
    return <div className="w-full h-full lg:px-5">
      <Skeleton className="w-full h-[370px] md:h-[400px] bg-grey100" />
      <div className="w-full flex flex-col md:flex-row">
        <Skeleton className="bg-grey100 w-full md:w-[50%] h-[300px]" />
        <Skeleton className="bg-grey100 w-full md:w-[50%] h-[300px]" />
      </div>
    </div>
  }
  console.log(SugEvent)
  return (
    <div className="lg:px-5">
      {/**hero section */}
      <div className="w-full flex justify-center mt-2  h-[370px] lg:h-[400px] rounded-lg bg-cover bg-center relative"
        style={{ backgroundImage: `url(${data?.event.imageUrl})` }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="absolute top-0 w-full h-full flex text-white p-6 md:p-10 flex-col md:flex-row gap-5">
          <div className="w-full md:w-[60%] flex flex-col h-full justify-center items-center">
            <h1 className="text-[30px] lg:text-[45px] font-bold">{data?.event.title}</h1>
            <p className="text-[14px] line-clamp-4 mt-8">{data?.event.description}</p>
          </div>
          <div className="hidden md:flex w-full md:w-[40%] justify-center">
            <Card className="w-[300px] md:h-[300px] bg-backgroundGrey p-6">
              <h5 className="text-[24px] font-bold">Date & Time</h5>
              <p className="text-[16px] font-normal text-grey600 mt-2">{format(data.event.startDate, "PPP")}</p>
              <div className="flex flex-col gap-4 mt-7">
                {
                  auth ? <EventCheckout event={data.event} /> : <Link to="/login">
                    <Button className="bg-primaryBlue hover:bg-primaryBlue text-white hover:text-white w-full" >
                      Book now
                    </Button>
                  </Link>
                }
                <Button className="w-full bg-grey300 hover:bg-grey300/90 text-white hover:text-white">
                  Program Promoter
                </Button>
              </div>
              <p className="text-[16px] text-grey600 mt-3 text-center">No Refunds</p>
            </Card>
          </div>

        </div>


      </div>

      {/**event details */}
      <div className="w-full flex flex-col md:flex-row gap-5 mt-10 px-4 lg:px-10">
        <div className="w-full md:w-[50%] ">
          <h5 className="text-[20px] md:text-[24px] font-bold">Description</h5>
          <p className="text-[14px] md:text-[16px] text-grey600 py-3 leading-6">{data.event.description}</p>
          <h5 className="text-[20px] md:text-[24px] font-bold">Date</h5>
          <div className="py-3">
            <p className="text-[16px] text-primaryBlue font-bold flex gap-2 items-center mb-2">
              <span className="text-grey600 text-[14px] font-normal">Start Date</span>
              {format(data.event.startDate, "PPP")}
            </p>
            <p className="text-[16px] text-primaryBlue font-bold flex gap-2 items-center">
              <span className="text-grey600 text-[14px] font-normal">End Date</span>
              {format(data.event.endDate, "PPP")}
            </p>
          </div>
          <h5 className="text-[20px] md:text-[24px] font-bold">Oraginzer Contact</h5>
          <p className="text-[16px] text-grey600 py-3">Please contact
            <span className="text-primaryBlue mx-1">{data.event.user.email}</span>
            {data.event.user.phoneNumber && <span className="text-primaryBlue mx-1"> or
              {data.event.user.phoneNumber}
            </span>}
            for more Information or details</p>
        </div>
        <div className="w-full md:w-[50%]">
          <h5 className="text-[20px] md:text-[24px] font-bold">Event Location</h5>
          <div className="py-3">
            <MapComponent address={data.event.location} />
            <p className="text-[16px] text-grey600 mt-2">Address: {data.event.location}</p>
          </div>
        </div>


        {/**Small screen book section */}
        <Card className="w-[300px] md:h-[300px] bg-backgroundGrey p-6 md:hidden py-3">
          <h5 className="text-[24px] font-bold">Date & Time</h5>
          <p className="text-[16px] font-normal text-grey600 mt-2">{format(data.event.startDate, "PPP")}</p>
          <div className="flex flex-col gap-4 mt-7">
            {
              auth ? <EventCheckout event={data.event} /> : <Link to="/login">
                <Button className="bg-primaryBlue hover:bg-primaryBlue text-white hover:text-white w-full" >
                  Book now
                </Button>
              </Link>
            }
            <Button className="w-full bg-grey300 hover:bg-grey300/90 text-white hover:text-white">
              Program Promoter
            </Button>
          </div>
          <p className="text-[16px] text-grey600 mt-3 text-center">No Refunds</p>
        </Card>
      </div>

      {/**Suggested Events */}
      <div className="w-full  mt-10 px-4 lg:px-10 ">
        <h5 className="text-[24px] font-bold mb-4">Other events you may like</h5>
        <div>
          {
            suggestedLoading ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                SugEvent?.suggestedEvent.slice(0, 3).map((event, index) => (
                  <EventCard event={event} key={index} />
                ))
              }
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default EventDetailPage
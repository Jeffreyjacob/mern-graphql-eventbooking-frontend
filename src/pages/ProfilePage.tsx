import { BookingTable } from "@/components/shared/BookingTable"
import EventCard from "@/components/shared/EventCard"
import ProfileForm from "@/components/shared/ProfileForm"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { USER } from "@/graphql/quries/userQuery"
import { UserProfileType } from "@/lib/type"
import { useQuery } from "@apollo/client"
import { useNavigate } from "react-router-dom"

export type UserInfoType = {
  email: string,
  name: string,
  phoneNumber: string,
  gender: string
  profilePicture: string
}

export type BookedEventType = {
  ticketDetail:{
    id:string,
    price:number,
    title:string,
    quantity:string
  }
  totalAmount:string
}

const ProfilePage = () => {
  const navigate = useNavigate()
  const { data, loading } = useQuery(USER)
  const User: UserProfileType = data?.user
  console.log(User)
  const userInfo: UserInfoType = {
    email: User?.email,
    name: User?.name,
    phoneNumber: User?.phoneNumber,
    gender: User?.gender,
    profilePicture: User?.profilePicture
  }


  if (loading) {
    return <h2>...loading</h2>
  }
  return (
    <div className="lg:px-5 pt-4">
      <div className=" px-4 md:px-10">
        <div className="w-full h-full flex flex-col gap-6">
          {/**User profile informations */}
          <h5 className="text-[18px] md:text-[25px] font-semibold text-black">
            User Profile
          </h5>
          <ProfileForm userInfo={userInfo} />

          {/**User event */}
          <h5 className="text-[18px] md:text-[25px] font-semibold text-black">
            My Event
          </h5>
          <div className="w-full h-full">
            {
              User?.event.length === 0 ? <Card className="w-full md:w-[500px] h-[250px] bg-white flex flex-col justify-center items-center gap-3">
                <span className="text-primaryBlue">
                  No Event Created Yet
                </span>
                <Button className="bg-primaryBlue hover:bg-primaryBlue rounded-2xl" onClick={() => navigate("/createEvent")}>
                  Create an event
                </Button>
              </Card> : <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center sm:justify-start" >
                {
                  User?.event.map((event, index) => (
                    <EventCard event={event} key={index} />
                  ))
                }
              </div>
            }

          </div>

          {/**Booked event */}
          <div className="w-full">
            <h5 className="text-[18px] md:text-[25px] font-semibold text-black">
              Booked Events
            </h5>
              <div>
                 <BookingTable bookedEvent={User.BookedEvent}/>
              </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default ProfilePage
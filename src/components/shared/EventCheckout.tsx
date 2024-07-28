import { EventType } from "@/lib/type"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { format } from "date-fns"
import { Card } from "../ui/card"
import { Separator } from "../ui/separator"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CHECKOUTSESSION } from "@/graphql/mutations/bookingMutation"
import { toast } from "sonner"

type Props = {
  event: EventType
}

const EventCheckout = ({ event }: Props) => {
  const [ticketNumber, setTicketNumber] = useState({
    ticket: 0,
    price: event?.price
  })

  const handleIncrement = () => {
    setTicketNumber((prevState) => ({
      ...prevState,
      ticket: prevState.ticket + 1
    }))
  }

  const handleDecrement = () => {
    setTicketNumber((prevState) => ({
      ...prevState,
      ticket: prevState.ticket - 1
    }))
  }

  const totalamount = ()=>{
    const total = event.price * ticketNumber.ticket
    return total.toFixed(2)
  }
  const [checkoutsession,{loading}] = useMutation(CHECKOUTSESSION,{
    variables:{input:{
       id:event._id.toString(),
       title:event.title,
       quantity:ticketNumber.ticket.toString(),
       price:event.price
    }}
  })
  const handleCheckout = async()=>{
    try{
      const data =  await checkoutsession()
     window.location.href =  data.data.createCheckOutSession.url
      
    }catch(error){
      if(error instanceof Error){
        toast.error(error.message)
      }else{
        toast.error("Unexpected error")
      }
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-primaryBlue hover:bg-primaryBlue text-white hover:text-white w-full" >
          Book now
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-backgroundGrey">
        <DialogTitle className=" sticky top-0 text-center border-b-[1px] border-grey600">
          <h5 className="text-[16px] text-grey600">
            {event?.title}
          </h5>
          <p className="text-[14px] text-grey600 py-3">
            {format(event?.startDate, "PPP")}
          </p>
        </DialogTitle>
        <div className="w-full h-full flex flex-col">
          <div className="w-full">
            <Card className="">
              <div className="p-4">
                <h5 className="text-[18px] font-bold">{event?.title}</h5>
              </div>
              <Separator />
              <div className="w-full flex justify-between items-center p-4">
                <p className="text-[16px] font-bold">$ {event?.price}</p>
                <div className="flex items-center gap-3">
                  <Button className="bg-primaryBlue hover:bg-primaryBlue text-white hover:text-white"
                    disabled={ticketNumber.ticket < 1}
                    onClick={handleDecrement}>
                    -
                  </Button>
                  <span className="text-[16px] font-semibold text-grey600">
                    {ticketNumber.ticket}
                  </span>
                  <Button className="bg-primaryBlue hover:bg-primaryBlue text-white hover:text-white"
                    onClick={handleIncrement}>
                    +
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          {/**Checkout container*/}
          <div className="">
            {/**checkout item */}
            {
              ticketNumber.ticket > 0 && <div className="px-4 py-4"> 
                <h5 className="text-[19px] font-bold">Order Summary</h5>
                <div className="w-full flex justify-between items-center mt-3">
                  <p className="text-[16px] text-grey600 font-light">
                    {ticketNumber.ticket} x {event.title}
                  </p>
                  <p className="text-[16px] font-normal">
                    $ {totalamount()}
                  </p>
                </div>
                 <div className="w-full flex justify-between items-center mt-3">
                    <h5 className="text-[19px] font-bold">Total</h5>
                    <p className="text-[19px] font-bold">
                      $ {totalamount()}
                    </p>
                 </div>
              </div>
            }
             {/**checkout button */}
             <Button className="w-full bg-primaryBlue hover:bg-primaryBlue text-white hover:text-white mt-3"
             disabled={ticketNumber.ticket < 1}
             onClick={handleCheckout}>
              {
                loading ? "loading...":" Checkout"
              }
             </Button>

          </div>

        </div>
      </DialogContent>
    </Dialog>

  )
}

export default EventCheckout
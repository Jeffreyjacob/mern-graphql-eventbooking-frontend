import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { BookedEventType } from "@/pages/ProfilePage"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
  
  type Props = {
     bookedEvent:BookedEventType[]
  }

  export function BookingTable({bookedEvent}:Props) {
    const navigate = useNavigate()
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Title</TableHead>
            <TableHead className="text-center">Number of ticket</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookedEvent.map((event,index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{event.ticketDetail.title}</TableCell>
              <TableCell className="text-center">{event.ticketDetail.quantity}</TableCell>
              <TableCell className="text-center">$ {parseInt(event.totalAmount)/100}</TableCell>
              <TableCell className="text-right">
                <Button className="bg-primaryBlue hover:bg-primaryBlue rounded-xl" onClick={()=>navigate(`/eventDetails/${event.ticketDetail.id}`)}>
                  View event
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
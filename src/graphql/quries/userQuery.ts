import { gql } from "@apollo/client";


export const AUTHUSER = gql`
  query AuthUser{
    authUser {
    _id,
    email,
    name,
    profilePicture,
    gender,
    phoneNumber,
   }
  }

`

export const USER = gql`
 query GetUser{
   user{
    email,
    name,
    profilePicture,
    gender,
    phoneNumber,
    event{
        organizerId,
        title,
        location,
        startDate,
        endDate,
        imageUrl,
        description,
        eventType,
        price,
        isFree, 
    },
    BookedEvent {
      ticketDetail {
        id,
        price,
        title,
        quantity
      },
      totalAmount
    }
   }
 }
`
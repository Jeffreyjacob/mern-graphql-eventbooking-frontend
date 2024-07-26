import { gql } from "@apollo/client";


export const GET_ALL_EVENT = gql`
  query GetAllEvent{
     events{
        _id,
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
     }
  }
`

export const EVENT_BY_ID = gql`
query EventById($id:ID!){
      event(eventId:$id){
        _id,
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
        user{
          email,
          phoneNumber
        }
      }
}
`

export const SUGGESTED_EVENT = gql `
  query SuggestedEvent($id:ID!){
    suggestedEvent(eventId:$id){
        _id,
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
    }
  }
`
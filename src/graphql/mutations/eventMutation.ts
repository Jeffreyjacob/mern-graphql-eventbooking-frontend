import { gql } from "@apollo/client";


export const CREATE_EVENT = gql`
 mutation CreateEvent($input:CreateEventInput!,$imageFile:Upload!){
    createEvent(input:$input,imageFile:$imageFile){
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

export const UPDATE_EVENT = gql`
   mutation UpdateEvent($input:UpdateEventInput!, $imageFile: Upload){
      updateEvent(input:$input,imageFile:$imageFile){
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
        isFree
      }
   }
`

export const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: ID!){
    deleteEvent(eventId: $eventId) {
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
        isFree
  }
  }
`
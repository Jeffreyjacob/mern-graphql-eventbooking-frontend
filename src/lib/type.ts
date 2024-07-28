
export const eventTypeData = [
    {name:"Concerts",value:"concerts"},
    {name:"Festivals",value:"festivals"},
    {name:"Classes & Workshops",value:"classes & workshops"},
    {name:"Conference",value:"conference"},
    {name:"Online Events",value:"online event"},
]

export type UserType = {
    _id:string
    email:string
    name:string
    profilePicture:string
    gender:string
    phoneNumber:string
}

export type EventType = {
       _id:string,
        organizerId:string,
        title:string,
        location:string,
        startDate:string,
        endDate:string,
        imageUrl:string,
        description:string,
        eventType:string,
        price:number,
        isFree:boolean,
}

export type CreateEventInputType = {
    organizerId:string
    title:string
    location:string
    startDate:string
    endDate:string
    description:string
    eventType:string
    price:string
    isFree:boolean,
}

export type UpdateEventInputType = {
    title:string
    location:string
    startDate:Date
    endDate:Date
    description:string
    eventType:string
    price:string
    isFree:boolean,
    ImageUrl:string
}

export const createformDefault = {
    title:"",
    location:"",
    startDate:new Date,
    endDate:new Date,
    description:"",
    eventType:"",
    price:"",
    isFree:false,
    ImageUrl:""
}

export type EventDetail = {
    _id:string,
    organizerId:string,
    title:string,
    location:string,
    startDate:string,
    endDate:string,
    imageUrl:string,
    description:string,
    eventType:string,
    price:number,
    isFree:boolean,
    user:{
        email:string,
        phoneNumber:number
    }
}

export type UserProfileType = {
    email:string
    name:string
    profilePicture:string
    gender:string
    phoneNumber:string,
    event:EventType[],
    BookedEvent: {
        ticketDetail:{
          id:string,
          price:number,
          title:string,
          quantity:string
        }
        totalAmount:string
      }[]
}
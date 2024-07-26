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
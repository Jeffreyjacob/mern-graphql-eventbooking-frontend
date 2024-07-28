import { gql } from "@apollo/client";


export const CHECKOUTSESSION = gql`
  mutation CheckoutSession($input:CheckOutRequestInput!){
    createCheckOutSession(input:$input){
        url
    }
  }
`



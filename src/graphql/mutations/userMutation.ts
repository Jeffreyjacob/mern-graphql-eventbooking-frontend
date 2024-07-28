import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUpQuery($input:SignUpInput!){
    signUp(input:$input) {
     name,
     profilePicture,
     gender,
  }
  }
`

export const LOGIN = gql`
  mutation LoginQuery($input:LoginInput!){
    login(input:$input) {
    name,
    email
  }
  }
`

export const LOGOUT = gql`
 mutation Logout{
  logOut {
    message
  }
}
`

export const FORGETPASSWORD = gql`
mutation SendResetPasswordLink ($input:ForgetPasswordInput!){
   forgetPasswordEmail(input:$input) {
     message
   }
}
`
export const RESETPASSWORD = gql`
 mutation ResetPassword($input:ResetPasswordInput!){
  resetPassword(input: $input) {
    message
  }
}
`

export const UPDATE_USER = gql`
 mutation UpdateUser($input:UpdateUserInput!){
  updateUser(input:$input) {
    name,
    gender,
    profilePicture,
    phoneNumber,
    email
 }
 }
`
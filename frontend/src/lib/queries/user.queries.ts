import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe($token: String!) {
    getMe(token: $token) {
      firstname
      lastname
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $newPassword: String
    $password: String
    $email: String
    $lastname: String
    $firstname: String
  ) {
    updateUser(
      newPassword: $newPassword
      password: $password
      email: $email
      lastname: $lastname
      firstname: $firstname
    )
  }
`;


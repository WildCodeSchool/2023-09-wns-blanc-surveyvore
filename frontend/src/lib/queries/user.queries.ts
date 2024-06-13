import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe($token: String!) {
    getMe(token: $token) {
      firstname
      lastname
      email
    }
  }
`;


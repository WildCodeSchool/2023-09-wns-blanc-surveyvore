import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const GET_LOGGED_USER = gql`
  query GetMe($token: String!) {
    getMe(token: $token) {
      email
      firstname
      id
      lastname
      role {
        id
      }
    }
  }
`;

export default function useLoggedUser() {
  const router = useRouter();

  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/signin");
  }

  const { data } = useQuery(GET_LOGGED_USER, {
    variables: {
      token: token && token,
    },
  });

  return data?.getMe;
}


import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "@/styles/reset.css";
import "@/styles/index.scss";
import RootLayout from "@/layouts/RootLayout";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  // TODO: create dotenv for the backend url --> résoudre le bug du .env et .gitignore
  uri: "http://localhost:3001/graphql",
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      if (error.extensions.code === "UNAUTHENTICATED") {
        localStorage.removeItem("token");
        window.location.replace("/signin");
      }
    });
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });


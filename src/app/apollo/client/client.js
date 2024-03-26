"use client";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { persistCache } from "apollo-cache-persist";

if (typeof window !== "undefined") {
  try {
    persistCache({
      cache: new InMemoryCache(),
      storage: window.localStorage,
    });
  } catch (error) {
    console.error("Error restoring Apollo cache", error);
  }
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions, path }) => {
      if (extensions.code === "UNAUTHENTICATED") {
        console.log("User is not authenticated==>");
      }
    });
  }
});

const httpLink = createHttpLink({
  uri: "/api/graphql",
  // credentials: "same-origin",
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  // link: ApolloLink.from([authLink, errorLink, httpLink]),
  link: authLink.concat(httpLink),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: "cache-and-network",
  //   },
  // },
  cache: new InMemoryCache({ addTypename: false }),
});

export default client;

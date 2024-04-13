import { gql } from "@apollo/client";

export const BOOKS = gql`
  query Books {
    books {
      title
      author
    }
  }
`;

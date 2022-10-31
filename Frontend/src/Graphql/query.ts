import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query(
    $username: String!
    $password: String!
  ) {
    users(query: { username: $username, password: $password}) {
      id,
      email,
      username,
      password,
    }
  }
`;

export const TODO_QUERY = gql`
  query(
    $userId: ID!
  ) {
    todos(query: $userId) {
      id,
      name,
      completed,
      owner
    }
  }
`;

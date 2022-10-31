import { gql } from '@apollo/client';

export const TODO_SUBSCRIPTION = gql`
  subscription {
    todo {
      mutation,
      name,
      data {
        id,
        name,
        completed,
        owner
      }
    }
  }
`;
import { gql } from '@apollo/client';

export const ADD_TODO_MUTATION = gql`
  mutation  addTodo(
    $name: String!
    $completed: Boolean!
    $owner: ID!
  ) {
    addTodo(
      data: {
        name: $name
        completed: $completed
        owner: $owner
      }
    ) {
      id,
      name,
      completed,
      owner
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation  deleteTodo(
    $id: ID!
  ) {
    deleteTodo(
      id: $id
    ) {
      id,
      name,
      completed,
      owner
    }
  }
`;

export const CHECK_TODO_MUTATION = gql`
  mutation  updateTodoCheck(
    $id: ID!
  ) {
    updateTodoCheck(
      id: $id
    ) {
      id,
      name,
      completed,
      owner
    }
  }
`;
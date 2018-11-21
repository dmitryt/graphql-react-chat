import gql from 'graphql-tag';

export const GET_ACTIVE_CHAT_QUERY = gql`
  query GET_ACTIVE_CHAT_QUERY {
    activeChat @client
  }
`;

const BASE_CHAT_FRAGMENT = gql`
  fragment BaseChat on Chat {
    _id
    title
    createdAt
    updatedAt
    members {
      _id
    }
  }
`;

export const CHATS_QUERY = gql`
  query CHATS_QUERY($type: String, $filter: String) {
    chats(type: $type, filter: $filter) {
      ...BaseChat
    }
  }
  ${BASE_CHAT_FRAGMENT}
`;

export const ACTIVE_CHAT_QUERY = gql`
  query ACTIVE_CHAT_QUERY($id: ID!) {
    chat(id: $id) {
      ...BaseChat
      messages {
        content
        sender {
          username
        }
      }
    }
  }
  ${BASE_CHAT_FRAGMENT}
`;

export const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION($title: String!) {
    createChat(input: { title: $title }) {
      _id
      title
      createdAt
      updatedAt
      members {
        _id
      }
    }
  }
`;

export const DELETE_CHAT_MUTATION = gql`
  mutation DELETE_CHAT_MUTATION($id: ID!) {
    deleteChat(id: $id)
  }
`;

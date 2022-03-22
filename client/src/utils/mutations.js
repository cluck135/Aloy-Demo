import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation addUser($email: String!, $password: String!) {
  addUser(email: $email, password: $password) {
    token
    user {
      _id
      email
    }
  }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
    }
  }
}
`;

export const UPDATE_USER = gql`
  mutation updateUser( $username: String! $newTagline: String! $newAvatar: String!) {
    updateUser( username: $username newTagline: $newTagline newAvatar: $newAvatar) {
      user {
        username
        tagline
        avatar
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($description: String!, $username: String!, $nft: newNFT!) {
    addPost(description: $description, username: $username, nft: $nft) {
      _id
      description
      nft {
        name
        image
        description
      }
    }
  }
`;
export const REMOVE_POST = gql`
  mutation removePost($username: String!, $postId: ID!) {
    removePost(username: $username, postId: $postId) {
      _id
    }
  }
`;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    points: Int
    openSeaLink: String
    nfts: [NFT]
    password: String!
  }

  type NFT {
    _id: ID!
    name: String!
    description: String!
    image: String!
  }

  input newNFT {
    name: String!
    description: String!
    image: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(email: String!, newTagline: String!, newAvatar: String): Auth
  }
`;

module.exports = typeDefs;

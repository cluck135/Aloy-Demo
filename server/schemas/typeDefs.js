const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    points: Int
    openSeaLink: String
    nfts: [Nft]
    password: String!
  }

  type Nft {
    _id: ID!
    name: String!
    image: String!
  }

  input newNft {
    name: String!
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
    nfts: [Nft]
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(email: String!, newTagline: String!, newAvatar: String): Auth
    addNft(nft: newNft!): Nft
  }
`;

module.exports = typeDefs;

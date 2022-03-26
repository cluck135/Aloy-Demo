const { AuthenticationError } = require("apollo-server-express");
const { User, Nft } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      const users = User.find().populate('nfts');
      console.log(users);
      return users
    },
    user: async (_, { email }) => {
      return User.findOne({ email }).populate('nfts');
    },
    nfts: async () => {
      const nfts = Nft.find()
      console.log(nfts)
      return nfts;
    },
    // nft: async(_, { email }) => {
    //   return Nft.findOne({ nftId })
    // },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("nfts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // posts: async (_, { email }) => {
    //   const params = email ? { email } : {};
    //   return Nft.find(params).sort({ createdAt: -1 })
    // },
    // post: async (_, { postId }) => {
    //   return Post.findOne({ _id: postId }).populate("nft");
    // },
    
  },

  Mutation: {
    addUser: async (_, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email }).populate("nfts")
  
      if (!user) {
        throw new AuthenticationError(
          "No user found with this username address"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);      

      return { token, user };
    },
    addNft: async (_, { nft }, context) => {
      const newNft = await Nft.create({
        name: nft.name,
        image: nft.image,
      });

    await User.findOneAndUpdate(
        { email: context.user.email },
        { $addToSet: { nfts: newNft._id } },
        {
          new: true,
        }
      );
        return newNft;
    }

    //   const returnPost = {
    //     ...post._doc,
    //     nft: {
    //       ...newNft._doc,
    //     },
    //   };

    //   return returnPost;
    //   // throw new AuthenticationError('You need to be logged in!');
    // },
    // addComment: async (_, { postId, text }, context) => {
    //   if (context.user) {
    //     return await Post.findOneAndUpdate(
    //       { _id: postId },
    //       {
    //         $addToSet: {
    //           comments: { text: text, author: context.user },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   // throw new AuthenticationError('You need to be logged in!');
    // },
    // removePost: async (_, { postId, username }) => {
    //   const post = await Post.findOneAndDelete({
    //     _id: postId,
    //   });

    //   await User.findOneAndUpdate(
    //     { username: username },
    //     { $pull: { posts: post._id } }
    //   );

    //   return post;
    // },
    // removeComment: async (_, { postId, commentId }, context) => {
    //   if (context.user) {
    //     return Post.findOneAndUpdate(
    //       { _id: postId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    // updateUser: async (_, { email }, context) => {
    //   return User.findOneAndUpdate(
    //     { username: username },
    //     {
    //       tagline: newTagline,
    //       avatar: newAvatar,
    //     }
    //   );
    // },
  }
}


module.exports = resolvers;

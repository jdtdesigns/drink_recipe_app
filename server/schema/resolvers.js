const User = require('../models/User');
const { GraphQLError } = require('graphql');

module.exports = {
  Query: {
    logout(_, args, context) {
      context.session.destroy();

      return {
        message: 'User logged out successfully!'
      }
    },
    async authenticated(_, args, context) {
      const user_id = context.session.user_id;

      if (!user_id) return { user: null };

      const user = await User.findById(user_id).populate('favorites');

      return user;
    }
  },

  Mutation: {
    async register(_, args, context) {
      try {
        const user = await User.create(args);

        context.session.user_id = user._id;

        return user;
      } catch (err) {
        throw new GraphQLError(err.message, {
          // extensions: {
          //   code: 'SOME_CUSTOM_ERROR_CODE'
          // }
        });
      }
    },
    async login(_, args, context) {
      const user = await User.findOne({
        email: args.email
      }).populate('favorites');

      if (!user) throw new GraphQLError('User with that email not found. Please register.', {
        extensions: {
          code: 'NO_ACCOUNT_FOUND'
        }
      });

      const valid_password = await user.validatePass(args.password);

      if (!valid_password) throw new GraphQLError('Password does not match.', {
        extensions: {
          code: 'PASSWORD_MISMATCH'
        }
      });

      context.session.user_id = user._id;

      return user;
    }
  }
}
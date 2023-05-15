const Drink = require('../models/Drink');

const resolvers = {
  Query: {
    async getDrinks(_, args, context) {
      const drinks = await Drink.find().populate('user');

      return drinks;
    },

    testQuery(_, args, context) {
      return args;
    }
  }
};

module.exports = resolvers;
const Drink = require('../models/Drink');

const resolvers = {
  Query: {
    async getDrinks(_, args, context) {
      const drinks = await Drink.find().populate('user');

      return drinks;
    },

    async getOneDrink(_, args, context) {
      const drink = await Drink.findById(args.id).populate('user');

      return drink;
    },

    testQuery(_, args, context) {
      return args;
    }
  }
};

module.exports = resolvers;
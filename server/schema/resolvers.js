const Drink = require('../models/Drink');

const resolvers = {
  Query: {
    async getDrinks() {
      const drinks = await Drink.find().populate('user');

      return drinks;
    }
  }
};

module.exports = resolvers;
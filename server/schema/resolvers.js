const resolvers = {
  Query: {
    hello() {
      // Equivalent to res.send()
      return 'hello from the back end!'
    },

    someData() {
      return {
        name: 'JD',
        age: 43
      }
    }
  }
};

module.exports = resolvers;
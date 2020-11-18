const pokemonsResolvers = require('./pokemons') // Pokemons Resolvers

// Export resolvers
module.exports = {
    Query: {
        ...pokemonsResolvers.Query
    },
    Mutation: {
        ...pokemonsResolvers.Mutation
    }
}
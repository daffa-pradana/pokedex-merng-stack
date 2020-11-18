const { gql } = require('apollo-server') // GraphQL Tag

// Define graphql types
module.exports = gql `
    type Pokemon{
        id: ID!
        name: String!
        pokemonName: String!
    }
    input PokemonInput{
        name: String!
        pokemonName: String!
    }
    type Query{
        getPokemons: [Pokemon]
        getPokemon(pokemonId: ID!): Pokemon
    }
    type Mutation{
        savePokemon(pokemonInput: PokemonInput): Pokemon
        releasePokemon(pokemonId: ID!): String!
    }
`
const { Mutation } = require('.')
const Pokemon = require('../../models/Pokemon') // Pokemon Model

// Pokemon resolvers
module.exports = {
    Query: {
        async getPokemons() {
            try {
                // Fetch all & sorts them in descending sequence
                const pokemons = await Pokemon.find() // then sort..
                return pokemons
            } catch(err) {
                // Throw error
                throw new Error(err)
            }
        },
        async getPokemon(_, { pokemonId }){
            try {
                // Find pokemon by id
                const pokemon = await Pokemon.findById(pokemonId)
                if(pokemon){
                    return pokemon
                } else {
                    throw new Error('Pokemon not found!')
                }
            } catch(err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async savePokemon(_,{ pokemonInput: { name, pokemonName } }, context, info){
            // New pokemon object
            const newPokemon = new Pokemon({
                name,
                pokemonName
            })

            // Save pokemon to DB
            const res = await newPokemon.save()

            // Return data
            return {
                ...res._doc,
                id: res._id
            }
        },
        async releasePokemon(_, { pokemonId }, context){
            try {
                // Find pokemon
                const pokemon = await Pokemon.findById(pokemonId)
                
                // Delete pokemon
                await pokemon.delete()

                // Return string
                return 'Pokemon released!'

            } catch(err) {
                throw new Error(err)
            }
        }
    }
}
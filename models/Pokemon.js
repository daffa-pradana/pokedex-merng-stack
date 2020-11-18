const { model, Schema } = require('mongoose') // Mongoose

// Pokemon schema
const pokemonSchema = new Schema({
    name: String,
    pokemonName: String,
})

// Export model
module.exports = model('Pokemon', pokemonSchema)
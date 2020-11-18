const { ApolloServer } = require('apollo-server') // Apollo Server
const mongoose = require('mongoose') // Mongoose

const { MONGODB } = require('./config') // MongoDB Config
const typeDefs = require('./graphql/typeDefs') // GraphQL Type Definition
const resolvers = require('./graphql/resolvers') // GraphQL Resolvers

// PORT
const PORT = process.env.PORT || 5000

// Define apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

// Server & DB Connection
mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB') // Remark
        return server.listen({ port: PORT }) // Run apollo server
    })
    .then(res => {
        console.log(`Server running at ${res.url}`) // Remark
    })
    .catch(err => {
        console.error(err)
    })
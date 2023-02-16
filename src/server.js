// Imports
const express = require('express')
const movieRouter = require('./routes/movies')


// Setup the server
const port = 1337
const app = express()


// Middleware
app.use( express.json() )



// Register routes
app.use('/api/movies', movieRouter)
// app.use('/api/actors', actorRouter)  <- if we need to add more endpoints



// Start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})

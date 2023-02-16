// Imports
const express = require('express')
const { getAllMovies } = require('./routes/movies')


// Setup the server
const port = 1337
const app = express()


// (Later: middleware)
// Register routes
app.get('/api/movies', getAllMovies)


// Start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})

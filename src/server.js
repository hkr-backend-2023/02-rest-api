// Imports
const express = require('express')
const cors = require('cors')
const movieRouter = require('./routes/movies')


// Setup the server
const port = 1337
const app = express()
const staticPath = 'src/static'
// use __dirname and path.join if this path does not work


// Middleware
app.use( cors() )
app.use( express.json() )
app.use( (req, res, next) => {
	console.log(`${req.method}  ${req.url}  `, req.body)
	// SEND - send a status back
	// NEXT - next middleware
	next()
} )
app.use( express.static(staticPath) )



// Register routes
app.use('/api/movies', movieRouter)
// app.use('/api/actors', actorRouter)  <- if we need to add more endpoints


// Start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})

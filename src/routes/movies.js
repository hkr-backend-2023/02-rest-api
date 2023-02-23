const express = require('express')
const { getAllMovies, getMovie, addMovie } = require('../database.js')
const router = express.Router()
const { isValidId, isValidMovie } = require('./validation.js')

// We use this instead of a database
// Database will be added next lecture
let fakeData = [
	{ title: 'The Shawshank Redemption', year: 1994, id: 1 },
	{ title: 'Big Fish', year: 2003, id: 2 },
	{ title: 'Inside out', year: 2015, id: 3},
	{ title: 'Up', year: 2009, id: 4 },
	{ title: 'The lives of others', year: 2006, id: 5 },
	{ title: 'Toy story', year: 1995, id: 6 },
	{ title: 'The incredibles', year: 2004, id: 7 }
]


router.get('/', async (req, res) => {
	console.log('GET /api/movies')
	let movies = await getAllMovies()
	res.send(movies)  // status code 200 is default
})

router.get('/:id', async (req, res) => {
	// We must validate the input, because the user/frontend can't be trusted!
	const id = Number(req.params.id)
	console.log('GET /api/movies/:id', id)
	
	if (!isValidId(id) ) {
		res.sendStatus(400)  // bad request
		return
	}

	// try to find the movie object
	let movies = await getMovie(id)
	if( movies.length < 1 ) {
		res.sendStatus(404)
		return
	}
	let movie = movies[0]
	res.send(movie)
})

router.post('/', async (req, res) => {
	// validate the body - is it a valid Movie object?
	// if it's invalid - 400 bad request
	// add object to database
	// return status 200

	const maybeMovie = req.body
	console.log('POST /api/movies body=', maybeMovie)

	if( !isValidMovie(maybeMovie) ) {
		console.log('POST /api/movies, body is not a Movie object')
		res.sendStatus(400)
		return
	}

	// After validating, insert new data into database
	try {
		await addMovie(maybeMovie)
	} catch(error) {
		console.log('POST /api/movies  rejected: ', error.message)
		res.sendStatus(500)
		return
	}
	res.sendStatus(200)
})

router.put('/:id', (req, res) => {
	// Validate the URL parameter
	// Validate the request body (movie object)
	// If not ok, status 400
	// Update database (replace object)
	// Status 200
	
	const idParam = req.params.id
	console.log('PUT /api/movies, id=', idParam)

	if ( !isValidId(idParam) ) {
		console.log('Not a valid id, id=', idParam)
		res.sendStatus(400)
		return
	}

	const maybeMovie = req.body
	if( !isValidMovie(maybeMovie) ) {
		console.log('Not a valid movie object, body=', maybeMovie)
		res.sendStatus(400)
		return
	}

	let movieIndex = fakeData.findIndex(movie => movie.id === idParam)
	if( movieIndex < 0 ) {
		console.log('Could not find a movie with id=', idParam)
		res.sendStatus(404)
		return
	}

	fakeData[movieIndex] = maybeMovie

	res.sendStatus(200)
})

router.delete('/:id', (req, res) => {
	const idParam = req.params.id
	console.log('DELETE /api/movies/:id', idParam)

	if (!isValidId(idParam)) {
		res.sendStatus(400)  // bad request
		return
	}

	let movieIndex = fakeData.findIndex(movie => movie.id === idParam)
	if (movieIndex < 0) {
		console.log('Could not find a movie with id=', idParam)
		res.sendStatus(404)
		return
	}

	// Delete from database
	// Hard way: Array.splice
	// Easy way: Array.filter
	fakeData = fakeData.filter(movie => movie.id !== idParam)
	res.sendStatus(200)
})



// Validate backend to protect the data
// Validate frontend to help the user

module.exports = router

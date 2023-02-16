const express = require('express')
const router = express.Router()
const { isValidId, isValidMovie } = require('./validation.js')

// We use this instead of a database
// Database will be added next lecture
let fakeData = [
	{ title: 'The Shawshank Redemption', year: 1994, id: 'a1' },
	{ title: 'Big Fish', year: 2003, id: 'a2' }
]


router.get('/', (req, res) => {
	console.log('GET /api/movies')
	res.send(fakeData)  // status code 200 is default
})

router.get('/:id', (req, res) => {
	// We must validate the input, because the user/frontend can't be trusted!
	const id = req.params.id
	console.log('GET /api/movies/:id', id)
	
	if (!isValidId(id) ) {
		res.sendStatus(400)  // bad request
		return
	}

	// try to find the movie object
	let maybeMovie = fakeData.find(movie => id === movie.id)
	if( !maybeMovie ) {
		res.sendStatus(404)  // not found
		return
	}

	const movie = maybeMovie
	res.send(movie)
})

router.post('/', (req, res) => {
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
	// ... after checking that it isn't a duplicate!
	// found will be the movie object or undefined
	let found = fakeData.find(movie => movie.id === maybeMovie.id)
	if( found ) {
		console.log('POST /api/movies, duplicate Movie object')
		res.sendStatus(400)  // 409 is also a possibility here
		return
	}

	fakeData.push(maybeMovie)

	res.sendStatus(200)
})

//  PUT /api/movies
//  PUT /api/movies/a2
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


// TODO: put, delete

// Validate backend to protect the data
// Validate frontend to help the user

module.exports = router

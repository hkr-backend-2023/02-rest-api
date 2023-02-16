const express = require('express')
const router = express.Router()
const { validateId, isValidMovie } = require('./validation.js')

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
	
	if( !validateId(id) ) {
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

// Next up: POST /api/movies
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

// TODO: post, put, delete

// Validate backend to protect the data
// Validate frontend to help the user

module.exports = router

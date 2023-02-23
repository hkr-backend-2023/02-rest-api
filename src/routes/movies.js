const express = require('express')
const { getAllMovies, getMovie, addMovie, deleteMovie, updateMovie } = require('../database.js')
const router = express.Router()
const { isValidId, isValidMovie } = require('./validation.js')



router.get('/', async (req, res) => {
	let movies = await getAllMovies()
	res.send(movies)  // status code 200 is default
})

router.get('/:id', async (req, res) => {
	// We must validate the input, because the user/frontend can't be trusted!
	const id = Number(req.params.id)
	
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

router.put('/:id', async (req, res) => {
	// Validate the URL parameter
	// Validate the request body (movie object)
	// If not ok, status 400
	// Update database (replace object)
	// Status 200
	
	const idParam = Number(req.params.id)

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

	let found = await getMovie(idParam)
	if (found.length < 1) {
		res.sendStatus(404)  // nothing to delete
		return
	}

	await updateMovie(idParam, maybeMovie)
	res.sendStatus(200)
})

router.delete('/:id', async (req, res) => {
	const idParam = Number(req.params.id)
	
	if (!isValidId(idParam)) {
		res.sendStatus(400)  // bad request
		return
	}

	let found = await getMovie(idParam)
	if( found.length < 1 ) {
		res.sendStatus(404)  // nothing to delete
		return
	}
	await deleteMovie(idParam)
	res.sendStatus(200)
})



// Validate backend to protect the data
// Validate frontend to help the user

module.exports = router

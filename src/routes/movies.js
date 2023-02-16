const express = require('express')
const router = express.Router()
const { validateId } = require('./validation.js')

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



// TODO: post, put, delete

module.exports = router

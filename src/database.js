const sqlite3 = require('sqlite3').verbose()

const file = 'sqlite-database'
const db = new sqlite3.Database(file)
// the Database method creates the connection
// This connection is maintained as long as the program is running, or until we close it explicitly




async function getAllMovies() {
	return new Promise( (resolve, reject) => {
		db.all(`SELECT * FROM Movies`, getCallback(reject, resolve))
	} )
}

async function getMovie(movieId) {
	return new Promise((resolve, reject) => {
		db.all(`SELECT * FROM Movies WHERE id=$id`, { $id: movieId }, getCallback(reject, resolve))
	})
}
async function getMovieByTitleYear(title, year) {
	return new Promise((resolve, reject) => {
		db.all(`SELECT * FROM Movies WHERE title=$title AND year=$year`, { $title: title, $year: year }, getCallback(reject, resolve))
	})
}

// Add a new movie object, used with POST routes / INSERT
// Assume that movie is a valid Movie object
async function addMovie(movie) {
	let matchingMovies = await getMovieByTitleYear(movie.title, movie.year)
	if( matchingMovies.length > 0 ) {
		return new Promise((resolve, reject) => {
			reject('A movie with same title and year already exist!')
		})
	}

	const sql = `INSERT INTO Movies (title, year) VALUES ($title, $year)`
	const params = { $title: movie.title, $year: movie.year }
	// With variables: easier to debug
	// console.log('DEBUG addMovie: ', sql, params)

	return new Promise((resolve, reject) => {
		db.run(sql, params, getCallback(reject, resolve))
	})
}


async function updateMovie() {}

async function deleteMovie() {}



// Extracting the callback function from the database functions, allows us to reuse code.
function getCallback(reject, resolve) {
	return (error, rows = null) => {
		if (error) {
			reject(error)  // failed, no data
		} else {
			resolve(rows)  // success
		}
	}
}


// Alternative method (for non-SELECT queries)
// Use like this: 
// return promisify(`INSERT INTO Movies (title, year) VALUES ($title, $year)`, { $title: title, $year: year })
async function promisify(sql, params) {
	return new Promise((resolve, reject) => {
		db.run(sql, params, getCallback(reject, resolve))
	})
}

module.exports = { getAllMovies, getMovie, addMovie, updateMovie, deleteMovie }

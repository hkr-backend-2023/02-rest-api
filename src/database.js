const sqlite3 = require('sqlite3').verbose()

const file = 'sqlite-database'
const db = new sqlite3.Database(file)
// the Database method creates the connection
// This connection is maintained as long as the program is running, or until we close it explicitly


async function getAllMovies() {
	return new Promise( (resolve, reject) => {
		db.all(`SELECT * FROM Movies`, (error, rows) => {
			if( error ) {
				reject(error)  // failed, no data
			} else {
				resolve(rows)  // success
			}
		})
	} )
}

async function getMovie(movieId) {
	return new Promise((resolve, reject) => {
		db.all(`SELECT * FROM Movies WHERE id=$id`, { $id: movieId }, (error, rows) => {
			if (error) {
				reject(error)  // failed, no data
			} else {
				resolve(rows)  // success
			}
		})
	})
}


module.exports = { getAllMovies, getMovie }

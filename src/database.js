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

/*
// This pattern of dealing with errors occurs in several Node libraries
const exampleCallback = (error) => {
	if( error ) {
		// an error occurred, do something, send status code
	} else {
		// everything is ok
	}
}
*/

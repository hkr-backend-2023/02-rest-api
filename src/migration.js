// Run this only when creating the database and the tables
const sqlite3 = require('sqlite3').verbose()

const file = 'sqlite-database'
const db = new sqlite3.Database(file)


let seedData = [
	{ title: 'The Shawshank Redemption', year: 1994, id: 1 },
	{ title: 'Big Fish', year: 2003, id: 2 },
	{ title: 'Inside out', year: 2015, id: 3 },
	{ title: 'Up', year: 2009, id: 4 },
	{ title: 'The lives of others', year: 2006, id: 5 },
	{ title: 'Toy story', year: 1995, id: 6 },
	{ title: 'The incredibles', year: 2004, id: 7 }
]

let errors = 0

db.serialize(() => {
	db.run(`
	CREATE TABLE Movies (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		year INTEGER NOT NULL
	)`, {}, error => { errors++ })

	seedData.forEach(movie => {
		console.log('About to add the movie ' + movie.title)
		db.run(
			`INSERT INTO Movies (title, year) VALUES ($title, $year)`,
			{ $title: movie.title, $year: movie.year },
			error => { errors++ }
		)
	})
})

console.log(`Number of errors: ` + errors)

/*
Movies(title, year, id)

CREATE TABLE Movies (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT NOT NULL,
	year INTEGER NOT NULL
)

INSERT INTO Movies (title, year) VALUES ('The Shawshank Redemption', 1994)

	{ title: 'The Shawshank Redemption', year: 1994, id: 1 },
	{ title: 'Big Fish', year: 2003, id: 2 },
	{ title: 'Inside out', year: 2015, id: 3},
	{ title: 'Up', year: 2009, id: 4 },
	{ title: 'The lives of others', year: 2006, id: 5 },
	{ title: 'Toy story', year: 1995, id: 6 },
	{ title: 'The incredibles', year: 2004, id: 7 }
*/

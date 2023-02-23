// "showMovies
// "movieList"

// Get DOM elements
// querySelector - uses CSS selector
// getElementById - uses id
const showMovies = document.querySelector('#showMovies')
const movieList = document.querySelector('#movieList')


// Add event listeners
showMovies.addEventListener('click', async () => {
	console.log('Show movies button is clicked')

	// 1. send request to server (GET all the movies)
	// 2. wait for response
	// 3. check for failure - display message to user
	// 4. if successful - display the data

	const options = { method: 'GET' }
	const response = await fetch('/api/movies', options)

	if( response.status !== 200 ) {
		// TODO: decide if we want to display an error message to the user, or merely tell them to try again later
		// Popups and overlays can be used. But don't use prompt or alert.
		console.log('Fetching data failed with status code: ' + response.status)
		return
	}

	const movies = await response.json()
	renderMovies(movies)
})

function renderMovies(movies) {
	movieList.innerHTML = ''
	movies.forEach(movie => {
		let element = createMovieElement(movie)
		movieList.append(element)
	})
}

function createMovieElement(movie) {
	let li = document.createElement('li')
	li.innerText = `${movie.title} from ${movie.year}.`
	return li
}


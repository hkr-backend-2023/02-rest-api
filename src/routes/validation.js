
function isValidId(id) {
	// id should be a positive integer or zero
	if((typeof id) !== 'number') {
		console.log('Validate id: id is not a number:', id)
		return false
	}
	else if( isNaN(id) ) {
		console.log('Validate id: id is NaN')
		return false
	}
	else if( id < 0 ) {
		console.log('Validate id: id is negative')
		return false
	}
	else if( Math.round(id) !== id ) {
		console.log('Validate id: id is not an integer')
		return false
	}
	return true
}

// keep this, in case we need it later
function isValidStringId(id) {
	// id should be a non-empty
	if ((typeof id) !== 'string') {
		console.log('Validate id: id is not a string:', id)
		return false
	}
	else if (id === '') {
		console.log('Validate id: id is an empty string:', id)
		return false
	}
	else {
		return true  // All is ok
	}
}

function isValidMovie(maybeMovie) {
	// { title, year, id }
	// Title: non-empty string
	// Year: positive number
	// Id: non-empty string
	if( !maybeMovie || (typeof maybeMovie) !== 'object' )  {
		return false
	}
	if( !isNonEmptyString(maybeMovie.title) ) {
		return false
	}
	if( !isPositiveNumber(maybeMovie.year) ) {
		return false
	}
	if( !isNonEmptyString(maybeMovie.id) ) {
		return false
	}
	return true
}

// Truthy and falsy

function isNonEmptyString(s) {
	return (typeof s) === 'string' && s !== ''
}
function isPositiveNumber(n) {
	return (typeof n) === 'number' && n >= 0
}


module.exports = { isValidId, isValidMovie }

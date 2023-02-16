
function validateId(id) {
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

module.exports = { validateId }

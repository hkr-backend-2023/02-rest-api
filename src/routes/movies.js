const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
	let fakeData = [
		{ title: 'The Shawshank Redemption', year: 1994, id: 'a1' },
		{ title: 'Big Fish', year: 2003, id: 'a2' }
	]

	res.send(fakeData)  // status code 200 is default
})


module.exports = router

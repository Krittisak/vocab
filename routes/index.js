'use strict'

const express = require ('express')
const router = express.Router ()

router.get ('/', (req, res, next) => {
	res.sendFile (process.cwd () + '/views/index.html')
})

router.get ('/score/:id', (req, res, next) => {
	res.sendFile (process.cwd () + '/views/score.html')
})

router.get ('/score', (req, res, next) => {
	res.redirect ('/score/0000')
})

module.exports = router

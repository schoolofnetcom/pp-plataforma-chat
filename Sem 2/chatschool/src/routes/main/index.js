const express = require('express')
const router = express.Router()

const isLoggedIn = require('./../middleware/isloggedin')

router.get('/', isLoggedIn, require('./../../services/main'))

module.exports = router
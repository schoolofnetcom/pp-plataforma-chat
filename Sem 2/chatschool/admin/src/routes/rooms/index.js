const express = require('express')
const router = express.Router()

const isLoggedIn = require('./../middleware/isloggedin')

const createRules = require('./../validator/rooms/create')
const editRules = require('./../validator/rooms/edit')
const removeRules = require('./../validator/rooms/remove')
const updateRules = require('./../validator/rooms/update')

router.get('/', isLoggedIn, require('./../../services/rooms/index'))
router.get('/new', isLoggedIn, require('./../../services/rooms/new'))
router.get('/edit/:slug', isLoggedIn, editRules, require('./../../services/rooms/edit'))
router.get('/:id', isLoggedIn, require('./../../services/rooms/show'))
router.post('/', isLoggedIn, createRules, require('./../../services/rooms/create'))
router.put('/:id', isLoggedIn, updateRules, require('./../../services/rooms/update'))
router.patch('/:id', isLoggedIn, updateRules, require('./../../services/rooms/update'))
router.delete('/:id', isLoggedIn, removeRules, require('./../../services/rooms/remove'))

module.exports = router
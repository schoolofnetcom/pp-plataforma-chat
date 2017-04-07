const express = require('express')
const router = express.Router()

const isLoggedIn = require('./../middleware/isloggedin')

const createRules = require('./../validator/users/create')
const editRules = require('./../validator/users/edit')
const removeRules = require('./../validator/users/remove')
const updateRules = require('./../validator/users/update')

router.get('/', isLoggedIn, require('./../../services/users/index'))
router.get('/new', isLoggedIn, require('./../../services/users/new'))
router.get('/edit/:id', isLoggedIn, editRules, require('./../../services/users/edit'))
router.get('/:id', isLoggedIn, require('./../../services/users/show'))
router.post('/', isLoggedIn, createRules, require('./../../services/users/create'))
router.put('/:id', isLoggedIn, updateRules, require('./../../services/users/update'))
router.patch('/:id', isLoggedIn, updateRules, require('./../../services/users/update'))
router.delete('/:id', isLoggedIn, removeRules, require('./../../services/users/remove'))

module.exports = router
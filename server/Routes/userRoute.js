const express = require('express')
const router = express.Router()
const {addUser,Login} = require('../controller/userController')

router.post('/add',addUser)
router.post('/login',Login)

module.exports = router
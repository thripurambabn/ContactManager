const express = require('express')
const router = express.Router()
const contactsController = require('../app/controllers/contactController')
const usersController=require('../app/controllers/userController')
const {authenticateUser}=require('../app/middlewares/authentication')

router.get('/contacts', authenticateUser,contactsController.list)
router.post('/contacts', authenticateUser,contactsController.create)
router.get('/contacts/:id', authenticateUser,contactsController.show)
router.put('/contacts/:id', authenticateUser,contactsController.update)
router.delete('/contacts/:id', authenticateUser,contactsController.destroy)

router.post('/users/register',usersController.create)
router.post('/users/login',usersController.login)
router.get('/users/account',authenticateUser,usersController.show)
router.delete('/users/logout',authenticateUser,usersController.destroy)


module.exports = router
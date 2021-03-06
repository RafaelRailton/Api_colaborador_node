const express = require('express')
const app = express()
const router = express.Router()
const CollaboratorController = require('../controllers/CollaboratorController')
const LoginController = require('../controllers/LoginController')
const Authentication = require('../middleware/Authentication')
router.post('/login',LoginController.login)
router.post('/colaborador',Authentication,CollaboratorController.create)
router.put('/colaborador/:id',CollaboratorController.update)
router.delete('/colaborador/:id',CollaboratorController.delete)
module.exports = router
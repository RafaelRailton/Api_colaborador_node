const express = require('express')
const app = express()
const router = express.Router()
const CollaboratorController = require('../controllers/CollaboratorController')
router.post('/create',CollaboratorController.create)
module.exports = router
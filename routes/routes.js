const express = require('express')
const app = express()
const router = express.Router()
const CollaboratorController = require('../controllers/CollaboratorController')
router.post('/colaborador',CollaboratorController.create)
router.put('/colaborador/:id',CollaboratorController.update)
router.delete('/colaborador/:id',CollaboratorController.delete)
module.exports = router
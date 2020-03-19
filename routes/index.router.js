const express = require('express')
const router = express.Router()
const home = require('../controllers/home.controller')
const utils = require('../controllers/utils.controller')

router.get('/', home.init)
router.post('/survey', utils.validatePIN, home.startSurveySession)
router.get('/survey/:pin', home.survey)

module.exports = router
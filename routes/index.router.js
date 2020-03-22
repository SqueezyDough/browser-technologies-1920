const express = require('express')
const router = express.Router()
const survey = require('../controllers/survey.controller')
const utils = require('../controllers/utils.controller')

router.get('/', survey.init)
router.post('/survey', utils.validatePIN, survey.returnPin)
router.post('/survey/booting-up', survey.bootingUp)
router.post('/survey/web-lectures', survey.webLectures)

module.exports = router
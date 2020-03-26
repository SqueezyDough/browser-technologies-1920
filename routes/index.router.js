const express = require('express')
const router = express.Router()
const survey = require('../controllers/survey.controller')
const utils = require('../controllers/utils.controller')

router.get('/', survey.init)

router.get('/survey/:pin', utils.validatePIN, survey.getSurveyPage)
router.post('/survey', utils.validatePIN, survey.returnPin)

router.get('/survey/booting-up/:pin', survey.getSurveyPage)
router.post('/survey/booting-up', survey.bootingUp)

router.get('/survey/web-lectures/:pin', survey.getSurveyPage)
router.post('/survey/web-lectures', survey.webLectures)

router.post('/survey/overview', survey.overview)

module.exports = router
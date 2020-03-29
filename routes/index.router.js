const express = require('express')
const router = express.Router()
const survey = require('../controllers/survey.controller')
const utils = require('../controllers/utils.controller')

// TODO restore session
router.get('/', survey.init)
router.get('/survey/:page/:pin', survey.getSurveyPage)
router.post('/survey', survey.surveyProgresser)


module.exports = router
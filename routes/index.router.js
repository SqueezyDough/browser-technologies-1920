const express = require('express')
const router = express.Router()
const survey = require('../controllers/survey.controller')

// TODO restore session
router.get('/', survey.init)

router.get('/sessions/:sessions', survey.getSessions)
router.post('/sessions', survey.loadSession)

router.get('/survey', survey.getSurveyPage)
router.get('/survey/:page/:pin', survey.getSurveyPage)

router.post('/survey', survey.surveyProgresser)
router.post('/survey/update-session', survey.updateDuringSession)

module.exports = router
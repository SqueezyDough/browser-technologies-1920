const render = require('./render.controller')
const store = require('./data-store.controller')
const pinGenerator = require('generate-pincode')

require("dotenv").config();

// TODO: set template pin
exports.init = (req, res) => {
    res.render('home', { app: process.env.NAME})
}

exports.surveyProgresser = (req, res) => {
    const pin = (req.query.page === '0' && !req.body.pin)
        ? generatePIN(6)
        : req.body.pin || JSON.parse(req.body.progressionTracker).pin

    const userJson = req.query.page === '0' && !req.body.pin
        ? store.storeUserProgression(pin)
        : store.getUserProgression(pin)

    // handle form when form is posted
    if (req.query.page) {
        handleForm(req, userJson)
    }

    const page = req.body.pin ? findPreviousSession(res, userJson) : 0

    render.renderView(req, res, userJson, page)
}

exports.getSurveyPage = (req, res) => {
    const user = store.getUserProgression(req.params.pin)
    render.renderView(req, res, user, req.params.page)
}

function findPreviousSession(res, user) {
    const uncompletedForm = findNextFormWithBlanks(user.forms)

    if (uncompletedForm) {
        return uncompletedForm.page
    } else {
        // has completed forms but not all
        const surveyPages = [1, 2, 3]
        const unVisitedPaths = surveyPages.filter((page, index) => user.forms[index] === undefined)

        return unVisitedPaths[0]
    }
}

function findNextFormWithBlanks(forms) {
    const formsWithBlanks = forms.filter(form => {
        const isAllFilled = Object.values(form.formData).every(answer => answer !== '')

        if (!isAllFilled) return form
    })

    return formsWithBlanks[0]
}


function handleForm(req, user) {
    const processedData = processFormData(req)
    store.updateUserProgression(user, processedData)
}

function processFormData(req) {
    const pathNames = [
        'Return PIN',
        'Booting up',
        'Web lectures',
        'Overview',
    ]

    const data = {
        page: (req.query.page - 1),
        pathName: pathNames[(req.query.page - 1)],
        formData: Object.assign({}, req.body)
    }

    delete data.formData.progressionTracker
    return data
}

function generatePIN(length) {
    return pinGenerator(length)
}
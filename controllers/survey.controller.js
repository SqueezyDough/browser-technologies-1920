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

    console.log('pin', pin)

    const userJson = req.query.page === '0' && !req.body.pin
        ? store.storeUserProgression(pin)
        : store.getUserProgression(pin)

    // handle form when form is posted
    if (req.query.page) {
        handleForm(req, userJson)
    }

    console.log('userJson', userJson)

    // console.log(pin)

    const page = req.body.pin ? findPreviousSession(userJson) : 0

    console.log(page)

    renderView(req, res, userJson, page)
}

function getFormData(user, page) {
    return user.forms.find((form) => {
        // nostrict --> typof = string and number
        return form.page == page
    })
}

exports.getSurveyPage = (req, res) => {
    const user = store.getUserProgression(req.params.pin)
    renderView(req, res, user, req.params.page)
}

findPreviousSession = user => {
    const uncompletedForm = findNextFormWithBlanks(user.forms)

    if (uncompletedForm) {
        console.log('uncompleted -->', uncompletedForm.page)
        return uncompletedForm.page
    } else {

        // has completed forms but not all
        const surveyPages = [1, 2, 3]
        const unVisitedPaths = surveyPages.filter((page, index) => user.forms[index] === undefined)

        console.log('next -->', unVisitedPaths[0])

        return unVisitedPaths[0]
    }
}

function findNextFormWithBlanks(forms) {
    const formsWithBlanks = forms.filter(form => {
        const isAllFilled = Object.values(form.formData).every(answer => answer !== '')

        if (!isAllFilled) return form
    })

    // console.log('formsWithBlanks -->', formsWithBlanks)

    return formsWithBlanks[0]
}


function handleForm(req, user) {
    const processedData = processFormData(req)
    console.log('user', user)
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


function renderView(req, res, user, page) {
    const userStringified = JSON.stringify(user)
    const requestPage = page || req.query.page
    const data = getFormData(user, requestPage) || false

    // TODO: check if tracker is needed (userStringified)
    res.render('survey/index', {
        page: page || req.query.page,
        formData: data.formData,
        user: user,
        userString: userStringified
    })
}
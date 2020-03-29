const render = require('./render.controller')
const store = require('./data-store.controller')
const pinGenerator = require('generate-pincode')

require("dotenv").config();

// TODO: set template pin
exports.init = (req, res) => {
    res.render('home', { app: process.env.NAME})
}

exports.surveyProgresser = (req, res) => {
    const pin = req.query.page === '0' ? generatePIN(6) : JSON.parse(req.body.progressionTracker).pin
    const userJson = req.query.page === '0' ? store.storeUserProgression(pin) : store.getUserProgression(pin)
    const formData = req.query.page !== '0' ? handleForm(req, userJson) : false

    if (req.body.pin) {
        // TODO: get page only
        console.log('session')
        findPreviousSession(req, res)
    } else {
        console.log('no-session')

        renderView(req, res, userJson)
    }

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

//TODO check if needed
exports.loadPreviousSession = (req, res) => {
    console.log(req.params.pin)
    const pin = req.params.pin
    const user = store.getUserProgression(pin)

    console.log('k')

    if (user) {
        console.log('a')
        const uncompletedForm = findLarenderViewFormWithBlanks(user.forms)

        if (uncompletedForm) {
            console.log('b')
            renderView(req, res, user, path)
        } else {
            //TODO CHECK PATHS
            console.log('c')
            const surveyPaths = ['survey/booting-up', 'survey/web-lectures']
            // has completed forms but not all
            const unVisitedPaths = surveyPaths.filter((path, index) => user.forms[index] === undefined)
            getSurveyPage(req, res, unVisitedPaths[0], pin)
        }
    }
}

findPreviousSession = (req, res) => {
    const pin = req.body.pin
    const user = store.getUserProgression(pin)

    if (user) {
        const uncompletedForm = findLarenderViewFormWithBlanks(user.forms)

        if (uncompletedForm) {
            renderView(req, res, user, uncompletedForm.page)
        } else {
            // has completed forms but not all
            const surveyPages = [0, 1, 2, 3]
            const unVisitedPaths = surveyPages.filter((page, index) => user.forms[index] === undefined)
            renderView(req, res, user, unVisitedPaths[0])
        }
    // fallback --> if no user is found start a new servey
    } else {
        renderView(req, res, user, 0)
    }
}

function findLarenderViewFormWithBlanks(forms) {
    const formsWithBlanks = forms.filter(form => {
        const isAllFilled = Object.values(form.formData).every(answer => answer !== '')

        if (!isAllFilled) return form
    })

    console.log('formsWithBlanks -->', formsWithBlanks)

    return formsWithBlanks[0]
}


function handleForm(req, user) {
    const processedData = processFormData(req)
    const updatedUser = store.updateUserProgression(user, processedData)

    return updatedUser
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
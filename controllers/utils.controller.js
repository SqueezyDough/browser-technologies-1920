const pinGenerator = require('generate-pincode')
const store = require('./data-store.controller')
const survey = require('./survey.controller')

exports.validatePIN = (req, res, next) => {
    res.locals.pin = generatePIN()
    next()


    // if (req.body) {
    //     loadPrevSession(req, res)
    // } else {
    //     res.locals.pin = generatePIN()
    //     next()
    // }
}

// TODO: validate
function loadPrevSession(req, res) {
    const pin = req.body.pin
    const user = store.getUserProgression(pin)

    if (user) {
        const surveyPaths = ['survey/booting-up', 'survey/web-lectures']
        const uncompletedForm = findLatestFormWithBlanks(user.forms)

        if (uncompletedForm) {
            survey.getSurveyPage(req, res, uncompletedForm.path, pin)
        } else {
            // has completed forms but not all
            const unVisitedPaths = surveyPaths.filter((path, index) => user.forms[index] === undefined)
            survey.getSurveyPage(req, res, unVisitedPaths[0], pin)
        }
    }
}

function findLatestFormWithBlanks(forms) {
    const formsWithBlanks = forms.filter(form => {
        const isAllFilled = Object.values(form.formData).every(answer => answer !== '')

        if (!isAllFilled) return form
    })

    console.log('formsWithBlanks', formsWithBlanks)

    return formsWithBlanks[0]
}



function generatePIN() {
    return pinGenerator(6)
}
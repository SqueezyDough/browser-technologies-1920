const render = require('./render.controller')
const store = require('./data-store.controller')

require("dotenv").config();

// TODO: set template pin
exports.init = (req, res) => {
    const viewName = 'home'

    const viewData = {
        app: process.env.NAME,
    }

    render.renderView(res, viewName, viewData)
}

exports.startSurveySession = (req, res) => {
    const pin = res.locals.pin

    const user = store.storeUserProgression(pin)

    res.locals.user = user

    res.redirect(`survey/${pin}`)
}

exports.survey = (req, res) => {
    const user = res.locals.user;
    res.render('survey/introduction', user)
}
const render = require('./render.controller')
const store = require('./data-store.controller')
const querystring = require('querystring');

require("dotenv").config();

// TODO: set template pin
exports.init = (req, res) => {
    res.render('home', { app: process.env.NAME})
}

exports.returnPin = (req, res) => {
    const pin = res.locals.pin
    const userJson = store.storeUserProgression(pin)
    const userStringified = JSON.stringify(userJson)

    res.render('survey/return-pin', {
        user: userJson,
        userString: userStringified
    })
}

exports.bootingUp = (req, res) => {
    const user = JSON.parse(req.body.progressionTracker)



    console.log('formdata', Object.entries(req.body))

    // updateUserProgression(user)

    const viewName = 'survey/booting-up'
    render.renderView(req, res, viewName)
}

exports.webLectures = (req, res) => {
    console.log('formdata', Object.entries(req.body))

    const viewName = 'survey/web-lectures'
    render.renderView(req, res, viewName)
}
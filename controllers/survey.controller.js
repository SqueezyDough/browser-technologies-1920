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
    const nextPath = 'survey/booting-up'
    render.renderView(req, res, nextPath)
}

exports.webLectures = (req, res) => {
    const nextPath = 'survey/web-lectures'
    const prevPath =  'survey/booting-up'
    const processedData = processFormData(req.body, prevPath)
    const user = JSON.parse(req.body.progressionTracker)

    store.updateUserProgression(user, processedData)
    render.renderView(req, res, nextPath)
}

exports.results = (req, res) => {
    const nextPath = 'survey/results'
    const prevPath =  'survey/web-lectures'
    const processedData = processFormData(req.body, prevPath)
    const user = JSON.parse(req.body.progressionTracker)

    store.updateUserProgression(user, processedData)
    render.renderView(req, res, nextPath)
}

function processFormData(rawData, path) {
    const data = {
        path: path,
        formData: Object.assign({}, rawData)
    }

    delete data.formData.progressionTracker
    return data
}
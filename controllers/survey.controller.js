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
    const path = 'survey/booting-up'

    // updateUserProgression(user)


    render.renderView(req, res, path)
}

exports.webLectures = (req, res) => {
    const path = 'survey/web-lectures'
    const processedData = processFormData(req.body, path)
    const user = JSON.parse(req.body.progressionTracker)

    store.updateUserProgression(user, processedData)

    console.log('processed data: ', processedData)

    render.renderView(req, res, path)
}

function processFormData(rawData, path) {
    const data = {
        path: path,
        formData: Object.assign({}, rawData)
    }

    delete data.formData.progressionTracker
    return data
}
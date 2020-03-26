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
    const formData = handleForm(req, prevPath)

    console.log('formData', formData)

    // render view
    render.renderView(req, res, nextPath, formData)
}

exports.overview = (req, res) => {
    // paths
    const nextPath = 'survey/overview'
    const prevPath =  'survey/web-lectures'
    const formData = handleForm(req, prevPath)

    render.renderView(req, res, nextPath, formData)
}

function handleForm(req, prevPath) {
    const processedData = processFormData(req.body, prevPath)
    const progression = JSON.parse(req.body.progressionTracker)
    const updatedUser = store.updateUserProgression(progression, processedData)

    return updatedUser
}

function processFormData(rawData, path) {
    const splittedPath = path.split('/')
    const pathName = splittedPath[splittedPath.length -1].replace('-', ' ')

    const data = {
        path: path,
        pathName: pathName,
        formData: Object.assign({}, rawData)
    }

    delete data.formData.progressionTracker
    return data
}
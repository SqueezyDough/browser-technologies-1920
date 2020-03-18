const render = require('./render.controller')
require("dotenv").config();

exports.init = function(req, res) {
    const viewName = 'home'
    const viewData = {
        app: process.env.NAME,
    }

    render.renderView(res, viewName, viewData)
}

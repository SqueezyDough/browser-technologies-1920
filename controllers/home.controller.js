const render = require('./render.controller')
require("dotenv").config();

exports.init = function(req, res) {
    const viewName = 'home'
    // const data = returnPin();

    const viewData = {
        app: process.env.NAME,
        // data: data
    }

    render.renderView(res, viewName, viewData)
}



const store = require('./data-store.controller')

exports.renderView = function(req, res, path, user) {
    const viewData = {}

    console.log('render0', user)

    if (user) {
        getFormData(user, path) ? viewData.formData = getFormData(user, path).formData : false

        viewData.user = user
    } else if (req.body) {

        if (req.body.pin) {
            viewData.user = store.getUserProgression(req.body.pin)
        } else {
            viewData.user = JSON.parse(req.body.progressionTracker)
        }
    }

    viewData.userString = JSON.stringify(viewData.user)
    viewData.title = `${process.env.NAME} - ${path}`

    res.render(path, viewData)
}

function getFormData(user, path) {
    return user.forms.find((form) => form.path === path)
}

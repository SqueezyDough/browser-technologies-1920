exports.renderView = function(req, res, viewName) {
    const userJson = JSON.parse(req.body.progressionTracker)
    const userStringified = JSON.stringify(userJson)

    console.log(userJson)

    const viewData = {
        user: userJson,
        userString: userStringified
    }

    viewData.title = `${process.env.NAME} - ${viewName}`
    res.render(viewName, viewData)
}

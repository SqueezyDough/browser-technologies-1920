exports.renderView = function(req, res, viewName, formData) {
    const viewData = {}

    console.log('url', req.url);
    console.log('url', req.url.endsWith('/booting-up'));

    formData ? viewData.user = formData : viewData.user = JSON.parse(req.body.progressionTracker)

    viewData.userString = JSON.stringify(viewData.user)

    viewData.title = `${process.env.NAME} - ${viewName}`
    res.render(viewName, viewData)
}

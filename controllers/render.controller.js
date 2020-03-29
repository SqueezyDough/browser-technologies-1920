 exports.renderView = function(req, res, user, page) {
    const userStringified = JSON.stringify(user)
    const requestPage = page || req.query.page
    const data = getFormData(user, requestPage) || false

    res.render('survey/index', {
        page: page || req.query.page,
        formData: data.formData,
        user: user,
        userString: userStringified
    })
}

function getFormData(user, page) {
    // nostrict --> typof = string and number
    return user.forms.find((form) => form.page == page)
}
const fs = require('fs')

// TODO: check if user is in data
exports.storeUserProgression = pin => {
    const storagePath = './data/survey-users.json'
    const data = readData(storagePath) || []
    const user = findUser(pin, data) ? createUser(pin) : createUser(pin)

    data.push(user)
    setUserProgression(data)

    return user
}

exports.getUserProgression = pin => {
    const data = readData('./data/survey-users.json')
    return findUser(pin, data)
}

exports.updateUserSession = (pin, page, formData) => {
    const storagePath = './data/survey-users.json'
    const storage = readData(storagePath)
    const key = formData[0]
    const value = formData [1]
    const user = findUser(pin, storage)

    const modifiedForm = user.forms.filter(form => {
        const keys = Object.keys(form.formData)
        const keyIndex = keys.indexOf(key)

        if (keyIndex > -1) {
            form.formData[key] = value
            return form
        }
    })

    if (modifiedForm.length === 0) {
        const form = user.forms[page-1]

        if (form) {
            user.forms[page-1].formData[key] = value
        } else {
            const temp = {
                page: page,
                formData: {}
            }

            temp.formData[key] = value
            user.forms.push(temp)
        }
    } else {
        user.forms[modifiedForm.page] = modifiedForm
    }

    mergeDataCollection(user, storagePath )

    return 'done'
}

exports.updateUserProgression = (user, formData) => {
    // exclude these pages
    if (formData.page !== -1 && formData.page !== 0) {
        const storagePath = './data/survey-users.json'
        const findFormIndex = user.forms.findIndex((form) => form.page === formData.page)

        findFormIndex === -1 ? user.forms.push(formData) : user.forms[findFormIndex] = formData

        mergeDataCollection(user, storagePath)
    }

    return user
}

function mergeDataCollection(changedUser, path) {
    const data = readData(path)
    const otherUsers = data.filter(user => user.pin !== changedUser.pin)

    otherUsers.push(changedUser)
    setUserProgression(otherUsers)

}

function setUserProgression(data) {
    const json = JSON.stringify(data ,null, 2);
    fs.writeFileSync('./data/survey-users.json', json);
}

function findUser (pin, data) {
    const user = data.find(users => users.pin === pin)

    return user
}

function createUser(pin) {
    return user = {
        pin: pin,
        forms: []
    }
}

function readData(path) {
    try {
        return JSON.parse(fs.readFileSync(path))
    } catch {
        return false
    }
}
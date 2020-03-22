const fs = require('fs')

// TODO: check if user is in data
exports.storeUserProgression = (pin, formData) => {
    const storagePath = './data/survey-users.json'
    const data = readData(storagePath) || []
    const user = findUser(pin, data) ? updateUser(pin, formData) : createUser(pin, formData)

    data.push(user)
    setUserProgression(data)

    return user
}

exports.getUserProgression = pin => {
    const data = readData('./data/survey-users.json')
    return findUser(pin, data)
}

exports.updateUserProgression = (user, formData) => {
    const storagePath = './data/survey-users.json'

    user.forms.push(formData)

    mergeDataCollection(user, storagePath)
}

function mergeDataCollection(changedUser, path) {
    const data = readData(path)
    const updatedData = data.filter(user => user.pin !== changedUser.pin)

    updatedData.push(changedUser)

    setUserProgression(updatedData)
}

function setUserProgression(data) {
    const json = JSON.stringify(data);
    fs.writeFileSync('./data/survey-users.json', json);
}

function findUser (pin, data) {
    return data.find(users => users.pin === pin)
}

function updateUser(pin, user) {
    return user = {
        pin: pin,
        forms: []
    }
}

function createUser(pin, formData) {
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
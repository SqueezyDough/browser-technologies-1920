const fs = require('fs')

// TODO: check if user is in data
exports.storeUserProgression = (pin, formData) => {
    const data = readData() || []
    const user = findUser(pin, data) ? updateUser(user, formData) : createUser(pin, formData)

    data.push(user)
    setUserProgression(data)

    return user
}

exports.getUserProgression = pin => {
    const data = readData()
    return findUser(pin, data)
}

function setUserProgression(data) {
    const json = JSON.stringify(data);
    fs.writeFileSync('./data/survey-users.json', json);
}

function findUser (pin, data) {
    return data.find(users => users.pin === pin)
}

function updateUser(user) {
    return user = {
        pin: pin,
        formData: {
            // games: formData['games']
            games: 'value'
        }
    }
}

function createUser(pin, formData) {
    return user = {
        pin: pin,
        formData: {
            // games: formData['games']
            games: 'value'
        }
    }
}

function readData() {
    try {
        return JSON.parse(fs.readFileSync('./data/survey-users.json'))
    } catch {
        return false
    }
}
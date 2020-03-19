const fs = require('fs')


// TODO: check if user is in data
exports.storeUserProgression = (pin, formData) => {
    const data = readFile();

    if (isInData(data, pin)) {

    }

    isInFile(pin) ? getUserProgression(pin) : setUserProgression(pin)

    const user = {
        pin: pin,
        formData: {
            games: 'value'
        }
    }

    writeFile(user)
}

function isInData(data, pin) {

}

function getUserProgression() {

}

function setUserProgression(user) {
    const json = JSON.stringify(user);
    fs.writeFileSync('./data/survey-users.json', json);
}

function readFile(user) {
    return fs.readFileSync('./data/survey-users.json');
}
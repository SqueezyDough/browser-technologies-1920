(function init() {
    var url = window.location.href.split('/')
    var endpoint = url[url.length -1]

    console.log(endpoint)

    // routes
    if (localStorage && endpoint === "") {
        if (getLocalStorage()) {
            const sessions = getLocalStorage()

            loadPrevSession(sessions)
        }
    }

    if (localStorage && endpoint === "?page=0") {
        var rawFormData = document.querySelector('input[name=progressionTracker]').value
        var formData = JSON.parse(rawFormData)

        getLocalStorage() ? updateLocalStorage(formData.pin) : setLocalStorage(formData.pin)
    }
})()

function loadPrevSession(sessions) {
    if (sessions) {
        var sessionsString = sessions.split(',')

        window.location.href = `/sessions/${sessionsString}`;
    }
}

function getLocalStorage() {
    return localStorage.getItem('sessions')
}

function setLocalStorage(pin) {
    return localStorage.setItem('sessions', pin)
}

function updateLocalStorage(pin) {
    if (!getLocalStorage().includes(pin)) {
        var sessions = [].concat(getLocalStorage())
        sessions.push(pin)

        setLocalStorage(sessions)
    }
}

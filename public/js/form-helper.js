(function init() {
    var url = window.location.href.split('/')
    var endpoint = url[url.length -1]

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

    if (localStorage) {
        watchFormValues()
    }
})()

function watchFormValues() {
    var inputs = document.getElementsByClassName('base-form__input')

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function() {
            sendData(this)
        })
    }
}

function sendData(input) {
    var tracker = document.querySelector('input[type="hidden"]')
    var page = tracker.getAttribute('data-page')
    var pin = JSON.parse(tracker.value).pin

    var body = [
        pin,
        page,
        {[input.name]: input.value}
    ]

    var bodyString = JSON.stringify(body)

    var url = '../../survey/update-session'
    var request = new XMLHttpRequest()
        request.open("POST", url)
        request.setRequestHeader("Content-Type", "application/json");
        request.send(bodyString)
}

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

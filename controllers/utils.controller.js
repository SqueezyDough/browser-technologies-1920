const pinGenerator = require('generate-pincode')

exports.validatePIN = (req, res, next) => {
    // console.log('req', req.body)

    res.locals.pin = req.body.pin ? validatePIN(req.body.pin) : generatePIN()
    next()
}

// TODO: validate
function validatePIN(pin) {
    return pin
}

function generatePIN() {
    return pinGenerator(6)
}
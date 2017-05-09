module.exports = (req, res, next) => {
    req
        .checkParams('slug', 'Field slug is required')
        .notEmpty()

    let errors = req.validationErrors()

    if (!errors) {
        return next()
    }

    return res.redirect('/rooms')
}
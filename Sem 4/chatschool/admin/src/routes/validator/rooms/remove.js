module.exports = (req, res, next) => {
    req
        .checkParams('id', 'Field id is required')
        .notEmpty()
        .isMongoId()

    let errors = req.validationErrors()

    if (!errors) {
        return next()
    }

    return res.redirect('/rooms')
}
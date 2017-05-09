const Users = require('./../../schemas/users')

module.exports = (req, res) => {
    Users
        .authenticate()(req.body.email, req.body.password, (err, user, options) => {
            if (err) {
                return res.send('Error: ' + err)
            }

            return req.login(user, (err) => {
                if (err) {
                    return
                }

                return res.redirect('/')
            })
        })
}
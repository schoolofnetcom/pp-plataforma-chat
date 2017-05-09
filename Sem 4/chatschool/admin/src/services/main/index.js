module.exports = (req, res) => {
    return res.render('main/index', {
        title: 'Chatschool - Admin',
        user_logged: req.user
    })
}
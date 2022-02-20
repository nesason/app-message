const experss = require("express")
const router = experss.Router()

const {
    getMessages,
    getUser,
    signup,
    login } = require('../controlers/users')

router.post('/signup', signup)

router.post('/login', login)
router.get('/user', getUser)
router.get('/message/:id', getMessages)


module.exports = router
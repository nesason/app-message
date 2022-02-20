const Users = require('../models/users')
const Message = require('../models/messages')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/config.json')
const Authtiction = require('../middleWare/authtiction')

module.exports = {

    getMessages: async (req, resp) => {
        const token = req.headers.authorization.split(' ')[1];

        let mid = Authtiction.authGet(token)
        if (mid === "Login failed") {
            return resp.json({ error: "auth faild" })
        }


        const from = req.params.id
        const data = await Message.find({ $and: [{ to: { $in: [from, mid] } }, { from: { $in: [from, mid] } }] }).sort({ createdAt: -1 })

        resp.json(data)



    },


    getUser: async (req, resp) => {
        const token = req.headers.authorization.split(' ')[1];

        let user = {}
        try {
            jwt.verify(token, JWT_KEY, (error, decodedtoken) => {
                if (error) {
                    throw "requset faild"
                }
                else {
                    user.id = decodedtoken.id
                    user.name = decodedtoken.name
                }

            })


            let users = await Users.find({ _id: { $nin: [user.id] } })

            const allUsersMessages = await Message.find({ $or: [{ mid: JSON.stringify(user.id) }, { to: user.name }] }).sort({ createdAt: -1 })

            users = users.map(otherUser => {
                const latestMessage = allUsersMessages.find(
                    m => m.from === otherUser.name || m.to === otherUser.name);
                console.log(otherUser)


                return {
                    name: otherUser.name,
                    _id: otherUser._id,
                    latestMessage: latestMessage,
                }
            })

            return resp.status(200).json({ users })


        } catch (error) {
            console.log(error)
            resp.json({ error })
        }



    },

    signup: (req, resp) => {
        const { name, email, password } = req.body
        Users.find({ email }).then((listUsers) => {
            if (listUsers.length > 0)
                return resp.json({ message: "email exit" })

            else {
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error)
                        return resp.status(500).json({ error })

                    const user = new Users({ name, email, password: hash })
                    user.save().then(result => {
                        console.log(result)
                        resp.status(200).json({ mesage: "create acounet" })

                    }).catch(error => { resp.status(500).json({ error }) })

                })
            }
        })



    }
    ,
    login: (req, resp) => {
        const { email, password } = req.body
        Users.find({ email }).then((result) => {
            if (result.length === 0)
                return resp.json({ message: " authotiction falid" })
            if (result) {
                const [user] = result
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error)
                        return resp.json({ message: " authotiction falid" })
                    if (result) {
                        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_KEY, { expiresIn: '2h' })

                        //
                        return resp.status(200).json({ name: user.name, email: user.email, token })
                    }
                    return resp.status(401).json({ message: "  authotiction falid" })

                })
            }
        })
    }


}
const { JWT_KEY } = require('../config/config.json')
const jwt = require('jsonwebtoken')

const authGet= (token) => {
    let result
    jwt.verify(token, JWT_KEY, (error, decodedtoken) => {
        if (error)
        result= "Login failed"
        else {
            result= decodedtoken.name
        }

    })
         return result
}
const authSend = (token) => {
    let result
    jwt.verify(token, JWT_KEY, (error, decodedtoken) => {
        if (error)
            result = "Login failed"
        else {
            result = [JSON.stringify(decodedtoken.id),decodedtoken.name]
        }

    })
    console.log(result)
     return result

}

module.exports = {authGet, authSend }
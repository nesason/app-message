const Message = require('../models/messages')
const { JWT_KEY } = require('../config/config.json')
const jwt = require('jsonwebtoken')


const sendMessage=(content,to,token)=>{

       let mid, from
       jwt.verify(token, JWT_KEY, (error, decodedtoken) => {
        if (error){ return "faild auth"}
        else {
            from= decodedtoken.name
            mid=JSON.stringify(decodedtoken.id)
        }

    })
       
        const message = new Message({ content, from, mid , to })
        message.save()
        return message  ;
}
module.exports={sendMessage}
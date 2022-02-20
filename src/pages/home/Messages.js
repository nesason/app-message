import React, { useEffect, Fragment, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import { useMessageDispatch, useMessageState } from '../../context/message'
import axios from 'axios'
import Message from './Message'


export default function Messages(props) {
    const { users } = useMessageState()
    const dispatch = useMessageDispatch()
    const [content, setContent] = useState("")
    const [messagesData, setMessageData] = useState([])
    
    const selectedUser = users?.find(u => u.selected === true)
    const messages = selectedUser?.messages

    useEffect(async () => {
        
        if (selectedUser != null && !selectedUser.messages) {
            const token = localStorage.getItem('token');
            let resp = await axios.get(`http://localhost:5000/users/message/${selectedUser.name}`,
                { headers: { "Authorization": `Bearer ${token}` } })
                
              setMessageData(resp.data)
        }

    }, [selectedUser])

    useEffect(()=>{
        if(messagesData.length>0){
            dispatch({
                type: 'SET_USER_MESSAGE', payload: {
                    name: selectedUser.name,
                    messages: messagesData
                }
            })
        }
       

    },[messagesData])

    
    let selectedChatMarkup
    if (!messages) {
        selectedChatMarkup = <p className='info-text'>select a friend</p>
    }

    else if (messages.length > 0) {
        selectedChatMarkup = messages.map((message, index) => (
            <Fragment key={message._id}>
                <Message message={message} />
                {index === messages.length - 1 && (<div className="invisible">
                    <hr className="m-0" />
                </div>)}
            </Fragment>))

    } else if (messages.length === 0) {
        selectedChatMarkup = <p className='info-text' >You are now conncted send your message</p>

    }


    const submitMessage = (e) => {
        
        e.preventDefault()
        if (content.trim() == "" || !selectedUser) {
            return
        }
        setContent("")
        sendMessage()

    }
       
    const sendMessage= async ()=>{
        
         const token = localStorage.getItem('token');
      
          props.callback({content,to:selectedUser.name,token})
     
    }

    return (

        <Col xs={10} md={8}  >
            <div className="messages-box d-flex flex-column-reverse">
                {selectedChatMarkup}
            </div>
            <div>
                <Form onSubmit={submitMessage}>
                    <Form.Group className='d-flex align-items-center'>
                        <Form.Control type="text" className="message-imput rounded-pill p-2 bg-secondary border-4"
                            placeholder="type a message" value={content} onChange={e => { setContent(e.target.value) }} />
                        <i className="fas fa-paper-plane fa-2x text-primary ml-2"
                            onClick={submitMessage}
                            role="button"></i>
                    </Form.Group>

                </Form>
            </div>


        </Col>
    )
}

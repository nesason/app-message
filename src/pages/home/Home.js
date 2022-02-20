import React, { Fragment, useState, useEffect } from 'react'
import { Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import User from './User'
import Message from './Messages'
import { useAuthDispatch, useAuthState } from '../../context/auth'
import { useMessageDispatch } from '../../context/message'
import io from "socket.io-client";


let socket = null


export default function Home() {


    const { user } = useAuthState()
    const disp = useMessageDispatch()
    const dispatch = useAuthDispatch()
    const [messages] = useState([])
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket'] });

        return () => {
            socket.emit('disconnect');
            socket.off();

        }

    }, [ENDPOINT]);

    const logout = () => {

        dispatch({ type: "LOGOUT" });
        window.location.href = '/login'
    }

    useEffect(() => {
        debugger
        socket.on('RECIVE', (message) => {
            debugger

            const otherUser = user.name === message.to ? message.from : message.to

            disp({
                type: 'ADD_MESSAGE', payload: {
                    name: otherUser,
                    message: message
                }
            })
        })

    }, [messages])

    const sendToData = (content, to, token) => {
        socket.emit('SEND', ({ content, to, token }))
    }


    return (
        <Fragment>
            <Row className="bg-white justify-content-around mb-1">
                <Link to='/login'>
                    <Button variant='link' >Login</Button>
                </Link>
                <Link to='/register'>
                    <Button variant='link' >Register</Button>
                </Link>
                <Button variant='link' onClick={logout} >
                    Logout
                </Button>
            </Row>
            <Row className="bg-white">
                <User />
                <Message callback={({ content, to, token }) => { sendToData(content, to, token) }} />
            </Row>
        </Fragment>
    )
}

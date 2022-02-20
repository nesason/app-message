import React, { useEffect } from 'react'
import { Col, Image } from 'react-bootstrap'
import axios from 'axios'
import { useMessageDispatch, useMessageState } from '../../context/message'
import className from 'classnames'




export default function User() {
  
    const dispatch = useMessageDispatch()
    const { users } = useMessageState()
    const selectedUser = users?.find(u => u.selected === true)?.name


    useEffect(async () => {
        
        const token = localStorage.getItem('token');

        const resp = await axios.get("http://localhost:5000/users/user", { headers: { "Authorization": `Bearer ${token}` } })

        dispatch({
            type: 'SET_USERS',
            payload: resp.data.users
        })
    }, [])



    let usersMarkup = ""

    if (!users) {
        usersMarkup = <p>Loading...</p>
    }
    else if (users === 0) {
        
        usersMarkup = <p>no users have joined yet</p>
    }
    else if (users.length > 0) {
        usersMarkup = users.map((user) => {
            const selected = selectedUser === user.name

            return (<div role="button" className={className("user-div d-flex justify-content-center justify-content-md-start p-3  ", { 'bg-white': selected })}
                key={user._id} onClick={() => dispatch({ type: 'SET_SELECTED_USER', payload: user.name })}>
                 <Image src={user.imageUrl ||"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}  className="user-image "
                     />
                <div className='d-none d-md-block ml-2'>
                    <p className="text-success">
                        {user.name}
                    </p>
                    <p className="font-weight-light">
                        {user.latestMessage ? user.latestMessage.content : 'you are now concted'}
                    </p>
                </div>
            </div>)
        })
    }
    return (
        <Col className="p-0 bg-secondary" xs={2} md={4}>
            {usersMarkup}
        </Col>
    )
}

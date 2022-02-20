import React from 'react'
import { useAuthState } from '../../context/auth'
import className from 'classnames'
import  moment from 'moment'
import {OverlayTrigger,Tooltip} from 'react-bootstrap'

export default function Message({message}) {
    const {user}=useAuthState()
    
    const sent=user.name===message.from
    const received=!sent

    return (
        <OverlayTrigger
        placement={ sent ? 'right' : 'left' }
        overlay={
          <Tooltip >
              {moment(message.createdAt).format('MMMM DD,YYYY @ h:mm a')}
          </Tooltip>
        }
      >
        <div className={className("d-flex my-3",{
            'ms-auto':sent,
            'me-auto':received
        })}>
        <div className={className("py-2 px-3 rounded-pill",{
            'bg-primary':sent,
            'bg-secondary':received
        })}>
            <p className={className({"text-white":sent})} key={message._id}>{message.content}</p>
        </div>
        </div>
        </OverlayTrigger>

    )
}

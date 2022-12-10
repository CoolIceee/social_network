import React from 'react'
import notificationImg from '../../../../public/assets/defaultImg/icons8-notification-96 (2).png'

function Notification() {
  return (
    <div className='notification'>
      <div className='styling_notification'>
        <div className='notification_contr'>
          <img className='notification_img' src={notificationImg} alt='err' />
        </div>
      </div>
    </div>
  )
}

export default Notification

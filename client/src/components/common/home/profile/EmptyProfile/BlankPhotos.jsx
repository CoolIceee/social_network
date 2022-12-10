import React from 'react'
import '../../../../../scss/home/interface/_blank.scss'
function BlankPhotos(props) {
  return (
    <div className='blank_container'>
      <div className='blank'>{props.text}</div>
    </div>
  )
}

export default BlankPhotos

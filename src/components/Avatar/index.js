import React from 'react'
import { Image } from 'react-bootstrap'
import './avatar.scss'

const Avatar = ({ src, frameSrc, className, onClick }) => {
  return (
    <div
      className={`position-relative cursor-pointer  ${className}`}
      onClick={onClick && onClick}
    >
      <Image src={frameSrc} className='avatar-frame' />
      {src ? (
        <Image
          src={src}
          style={{
            height: '120px',
            width: '120px',
            border: '2px solid #1963AE',
          }}
          roundedCircle
        />
      ) : (
        <div
          className='d-flex align-items-center justify-content-center'
          style={{
            height: '120px',
            width: '120px',
            border: '2px solid #1963AE',
            borderRadius: '120px',
            textAlign: 'center',
            backgroundColor: '#1963AE',
          }}
        >
          No crowned <br /> Ape
        </div>
      )}
    </div>
  )
}

export default Avatar

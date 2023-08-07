import React from 'react'
import './profile-error-label-bar.scss'

function ProfileErrorLabelBar({ isShow, label }) {
  return isShow && <div className='profile-error-label'>{label}</div>
}

export default ProfileErrorLabelBar

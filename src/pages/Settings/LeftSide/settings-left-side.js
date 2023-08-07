import React from 'react'
import { useNavigate } from 'react-router-dom'
import './settings-left-side.scss'

const sideBarList = [
//   { title: 'General', router: 'general' },
//   { title: 'Audio', router: 'audio' },
//   { title: 'Key Bindings', router: 'key-bindings' },
  { title: 'Account', router: 'account' },
]

function LeftSideBar({ tab }) {
  const navigate = useNavigate()

  return (
    <div className='settings-page-left-sidebar'>
      <h3>Settings Menu</h3>
      {sideBarList.map((item, index) => (
        <div
          key={`settings-left-side-${index}`}
          onClick={() => navigate(`/settings/${item.router}`)}
          className={tab === item.title ? 'active' : ''}
        >
          <h4>{item.title}</h4>
        </div>
      ))}
    </div>
  )
}

export default LeftSideBar

import React from 'react'
import { Image } from 'react-bootstrap'
import ApeProfileButton from '../ApeProfileButton'

const CharacterMenu = ({ tab, setTab, setSelected }) => {
  return (
    <div
      className='d-flex align-items-center flex-column'
      style={{ width: '28%', minWidth: '28%', maxWidth: '28%' }}
    >
      <div className='left-menu-header w-100'>CHARACTER MENU</div>
      <div className='custom-border-bottom w-100 mb-3' />
      <div className='d-flex justify-content-center align-items-start flex-column w-100 mt-2'>
        <ApeProfileButton
          active={tab === 'Overview'}
          icon={<Image src='/images/v2/overview.png' fluid />}
          // onClick={() => setTab('Overview')}
        >
          {' '}
          Overview{' '}
        </ApeProfileButton>
        <ApeProfileButton
          active={tab === 'Level'}
          icon={<Image src='/images/v2/level.png' fluid />}
          // onClick={() => {
          //   setTab('Level')
          //   setSelected('Level')
          // }}
        >
          {' '}
          Level{' '}
        </ApeProfileButton>
        <ApeProfileButton
          active={tab === 'Ascension'}
          icon={<Image src='/images/v2/evolve.png' fluid />}
          // onClick={() => setTab('Evolution')}
        >
          {' '}
          Ascension{' '}
        </ApeProfileButton>
        <ApeProfileButton
          active={tab === 'Inventory'}
          icon={<Image src='/images/v2/inventory.png' fluid />}
          // onClick={() => {
          //   setTab('Inventory')
          //   setSelected('Inventory')
          // }}
        >
          {' '}
          Inventory{' '}
        </ApeProfileButton>
        <ApeProfileButton
          active={tab === 'Limit Break'}
          icon={<Image src='/images/v2/craft.png' fluid />}
          // onClick={() => {
          //   setTab('Limit Break')
          //   setSelected('Limit Break')
          // }}
        >
          {' '}
          Limit Break{' '}
        </ApeProfileButton>
        <ApeProfileButton
          active={tab === 'Forging'}
          icon={<Image src='/images/v2/forge.png' fluid />}
          // onClick={() => {
          //   setTab('Forging')
          //   setSelected('Forging')
          // }}
        >
          {' '}
          Forging{' '}
        </ApeProfileButton>
        <ApeProfileButton
          active={tab === 'Repair'}
          icon={<Image src='/images/v2/repair.png' fluid />}
          // onClick={() => {
          //   setTab('Repair')
          //   setSelected('Repair')
          // }}
        >
          {' '}
          Repair{' '}
        </ApeProfileButton>
      </div>
    </div>
  )
}

export default CharacterMenu

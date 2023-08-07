import React, { useEffect, useState } from 'react'
import Account from './Account/account'
import Audio from './Audio/audio'
import './settings-content.scss'

function SettingsContent({ tab, crownedApeId, account, apes, selectedApes }) {
  return (
    <>
      <div className='settings-content-container custom-scroll'>
        {tab === 'Account' ? (
          <Account
            crownedApeId={crownedApeId}
            account={account}
            apes={apes}
            selectedApes={selectedApes}
          />
        ) : tab === 'Audio' ? (
          <Audio />
        ) : null}
      </div>
    </>
  )
}

export default SettingsContent

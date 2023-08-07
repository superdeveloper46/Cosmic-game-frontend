import React, { useEffect, useState } from "react"
import CloseButton from "../CloseButton"
import CharacterProfileStats from "../CharacterProfileStats/character-profile-stats"
import PanelDivider from "../PanelDivider/panel-divider"
import LeftPanel from "../LeftPanel/left-panel"
import MiddlePanel from "../MiddlePanel/middle-panel"
import RightPanel from "../RightPanel/right-panel"
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'

const ApeProfileDialog = ({
  open,
  crownedApeId,
  switchCrown,
  apes = [],
  craftRecipes,
  ape,
  setApe,
  reloadApes,
  onClose,
  setMessage,
}) => {
  const backSound = useAudio(AUDIOLIST['EXIT_BACK_BUTTON'])
  const [ tab, setTab ] = useState('Level')

  useEffect(() => {
    setTab('Level')
  }, [ open ])

  const gotoLeftApe = () => {
    if (apes.length === 0) return

    const apeIndex = apes.findIndex((cApe) => cApe === ape)
    if (apeIndex === -1) return

    setApe(apes[(apeIndex - 1 + apes.length) % apes.length])
  }

  const gotoRightApe = () => {
    if (apes.length === 0) return

    const apeIndex = apes.findIndex((cApe) => cApe === ape)
    if (apeIndex === -1) return

    setApe(apes[(apeIndex + 1) % apes.length])
  }

  return !!open ? (
    <div className='ape-profile-dialog-container'>
      <div className='dialog-header d-flex justify-content-center align-items-center pt-2'>
        <div className='d-flex justify-content-center align-items-center flex-column'>
          CHARACTER PROFILE:
          <div>{tab}</div>
        </div>
        <CloseButton onClick={() => {
          backSound()
          onClose()
        }} />
      </div>
      <div className='ape-profile-container'>
        <div className="d-flex">
          <LeftPanel
            tab={ tab }
            setTab={ setTab }
          />
          <PanelDivider vertically/>
          <MiddlePanel
            ape={ ape }
            gotoLeftApe={ gotoLeftApe }
            gotoRightApe={ gotoRightApe }
            crownedApeId={crownedApeId}
            switchCrown={switchCrown}
            reloadApes={reloadApes}
          />
          <PanelDivider vertically/>
          <RightPanel
            ape={ ape }
            gotoLeftApe={ gotoLeftApe }
            gotoRightApe={ gotoRightApe }
            crownedApeId={crownedApeId}
            switchCrown={switchCrown}
            reloadApes={reloadApes}
          />
          {/* {tab === 'Level' ? 
            <ApeProfileCharacterOverview
              crownedApeId={crownedApeId}
              switchCrown={switchCrown}
              ape={ape}
              reloadApes={reloadApes}
            />
            : tab === 'Level'
            ? <ApeProfileLevelUp 
              ape={ ape } 
              reloadApes={ reloadApes } 
              setMessage={ setMessage }
              gotoEvolution={ () => setTab('Ascension') }
            />
            : tab === 'Ascension'
            ? <ApeProfileEvolution 
              ape={ ape } 
              reloadApes={ reloadApes } 
              setMessage={ setMessage }
              gotoLevelUp={ () => setTab('Level') }
            />
            : tab === 'Inventory'
            ? <ApeProfileInventory
              ape={ ape } 
              reloadApes={ reloadApes } 
              setMessage={ setMessage }
            />
            : tab === 'Crafting'
            ? <ApeProfileCraft
              ape={ ape } 
              craftRecipes={ craftRecipes }
              reloadApes={ reloadApes } 
              setMessage={ setMessage }
            />
            : tab === 'Forging'
            ? 'Forging'
            : tab === 'Repair'
            ? 'Repair'
            : null
          } */}
        </div>
      </div>
    </div>
  ) : null
}

export default ApeProfileDialog

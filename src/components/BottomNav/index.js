import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import CharacterSidebar from "../CharacterSidebar/character-sidebar";
import MenuSidebar from "../MenuSidebar/menu-sidebar";
import './index.css'

const BottomNav = ({
  apes,
  items,
  legendaries,
  resources,
  setMissionListDialogOpen,
  setPreview,
  setMessage,
  crownedApeId,
  setRewards,
  setIsBankOpen,
  reloadApes,
  reloadAccount,
  setProfileApe,
  open,
  setIsItemOpen,
  isEquip,
  setIsEquip,
  setSelectedInventory
}) => {
  const navigate = useNavigate()
  const [ charactersListCollapsed, setCharactersListCollapsed ] = useState(true)
  const [ menuCollapsed, setMenuCollapsed ] = useState(true)

  return (
    <div className="bottom-nav row d-flex justify-content-start">
      <div className="d-flex col-4" style={{ position: 'absolute', left: 0, bottom: 0, padding: 0 }}>
        <CharacterSidebar
          apes={ apes }
          collapsed={ charactersListCollapsed }
          setCollapsed={ 
            collapsed => {
              setCharactersListCollapsed(collapsed)
              setMenuCollapsed(true)
            }
          }
          crownedApeId={crownedApeId}
          setMessage={ setMessage }
          setRewards={ setRewards }
          setMissionListDialogOpen={ setMissionListDialogOpen }
          reloadApes={ reloadApes }
          reloadAccount={ reloadAccount }
          setProfileApe={setProfileApe}
          open={open}
          setIsItemOpen={setIsItemOpen}
          isEquip={isEquip}
          setIsEquip={setIsEquip}
          setSelectedInventory={setSelectedInventory}
        />
      </div>
    </div>
  )
}

export default BottomNav
import { useWallet } from '@solana/wallet-adapter-react'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import claimAllMissions from '../../utils/claim-all-missions'
import filterApes from '../../utils/filter-apes'
import CharacterListFilter from '../CharacterListFilter/character-list-filter'
import CharacterRow from '../CharacterRow/character-row'
import ClaimButton from '../ClaimButton'
import Dropdown from '../Dropdown'
import Loading from '../Loading/loading'
import NormalButton from '../NormalButton'
import Pagination from '../Pagination'
import PinButton from '../PinButton/pin-button'

const filterList = ['Filter Powers', 'Filter Tiers']

const tierFilters = [
  'All Tiers',
  'Tier 1',
  'Tier 2',
  'Tier 3',
  'Tier 4'
]

const CharacterSidebar = ({
  apes,
  collapsed,
  setCollapsed,
  setMessage,
  setRewards,
  crownedApeId,
  setMissionListDialogOpen,
  reloadApes,
  reloadAccount,
  setProfileApe,
  open,
  setIsItemOpen,
  isEquip,
  setIsEquip,
  setSelectedInventory,
}) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const claimSound = useAudio(AUDIOLIST['CLAIM_REWARD'])
  const inactiveSound = useAudio(AUDIOLIST['INACTIVE_BUTTON'])
  const sidebarInSound = useAudio(AUDIOLIST['SIDEBAR_IN_SFX'])
  const sidebarOutSound = useAudio(AUDIOLIST['SIDEBAR_OUT_SFX'])
  const [hasMounted, setHasMounted] = useState(false)
  const { publicKey } = useWallet()
  const [filteredApes, setFilteredApes] = useState(apes)
  const [stateFilter, setStateFilter] = useState('idle')
  const [nameFilter, setNameFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [filterType, setFilterType] = useState(filterList[0])
  const [currentPage, setCurrentPage] = useState(1)

  const powers = useSelector((state) => state.apes.powers)
  const powerFilters = [
    'All Powers',
    'No Power',
    ...powers.map((power) => power.power),
  ]

  useEffect(() => {
    if (!!filterType) {
      setCurrentPage(1)
    }
  }, [filterType])

  useEffect(() => {
    const powerFilter =
      filterType === filterList[0]
        ? powerFilters[currentPage - 1]
        : powerFilters[0]

    const tierFilter =
      filterType === filterList[1]
        ? tierFilters[currentPage - 1]
        : tierFilters[0]
      
    setFilteredApes(
      filterApes({
        nameFilter,
        powers,
        powerFilter,
        tierFilter: tierFilters.indexOf(tierFilter),
        stateFilter,
        apes,
      }),
    )
  }, [apes, nameFilter, stateFilter, filterType, currentPage])

  useEffect(() => {
    if (hasMounted) {
      if (collapsed) {
        sidebarInSound()
      } else {
        sidebarOutSound()
      }
    } else {
      setHasMounted(true)
    }
  }, [collapsed])

  return (
    <div
      className={`character-sidebar-container px-2 ${
        collapsed ? 'collapsed' : ''
      }`}
    >
      <div
        className='d-flex justify-content-center align-items-center mb-3 mt-2'
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        <PinButton
          style={{
            position: 'absolute',
            right: '1rem',
            width: '24px',
            height: '24px',
          }}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>
      <div className='d-flex flex-wrap' style={{ margin: '0.5rem' }}>
        <NormalButton
          style={{ flex: 1, margin: '2px' }}
          onClick={() => {
            generalSound()
            setStateFilter('idle')
            setCollapsed(false)
          }}
          inactive={stateFilter !== 'idle'}
          key='menu-sidebar-idle-button'
        >
          IDLE({apes.filter((ape) => !ape.gameData.active_mission).length})
        </NormalButton>
        <NormalButton
          style={{ flex: 1, margin: '2px' }}
          onClick={() => {
            generalSound()
            setStateFilter('crusading')
            setCollapsed(false)
          }}
          inactive={stateFilter !== 'crusading'}
          key='character-sidebar-crusading-button'
        >
          CRUSADING(
          {
            apes.filter(
              (ape) => ape.gameData?.activeMissionEffect?.remainingMinutes > 0,
            ).length
          }
          )
        </NormalButton>
        <NormalButton
          className='py-2'
          style={{ flex: 1, margin: '2px' }}
          onClick={() => {
            generalSound()
            setStateFilter('claimable')
            setCollapsed(false)
          }}
          inactive={stateFilter !== 'claimable'}
          key='character-sidebar-claimable-button'
        >
          CLAIMABLE(
          {
            apes.filter(
              (ape) => ape.gameData?.activeMissionEffect?.remainingMinutes <= 0,
            ).length
          }
          )
        </NormalButton>
      </div>
      {!collapsed ? (
        <>
          <CharacterListFilter
            apes={apes}
            setFilteredApes={setFilteredApes}
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
          />
          <div className='d-flex align-items-center justify-content-around gap-3 flex-wrap mt-3'>
            <Dropdown
              selected={filterType}
              lists={filterList}
              handleSelect={(e) => setFilterType(e)}
            />
            {filterType === filterList[0] ? (
              <Pagination
                title={powerFilters[currentPage - 1]}
                currentPage={currentPage}
                totalCount={5 * powerFilters.length}
                pageSize={5}
                onPageChange={(page) => setCurrentPage(page)}
                className='power-filter-pagination'
                itemShow={false}
              />
            ) : (
              <Pagination
                title={tierFilters[currentPage - 1]}
                currentPage={currentPage}
                totalCount={5 * tierFilters.length}
                pageSize={5}
                onPageChange={(page) => setCurrentPage(page)}
                className='power-filter-pagination'
                itemShow={false}
              />
            )}
            <Dropdown
              selected={filterType}
              lists={filterList}
              handleSelect={(e) => setFilterType(e)}
              className='invisible'
            />
          </div>
          <div
            style={{
              minHeight: 'calc(85vh - 300px)',
              maxHeight: 'calc(85vh - 300px)',
              overflowY: 'auto',
            }}
            className='custom-scroll my-2 py-0'
          >
            {(filteredApes || []).map((ape) => (
              <CharacterRow
                key={`ape-${ape.mint}`}
                ape={ape}
                crownedApeId={crownedApeId}
                // onClick={() => setProfileApe(ape)}
                reloadApes={reloadApes}
                inventories={(ape?.gameData?.default_items || [])
                  .map((dItem) => dItem.Inventory)
                  .filter((inv) => !!inv)}
                open={open}
                setIsItemOpen={setIsItemOpen}
                isEquip={isEquip}
                setIsEquip={setIsEquip}
                setSelectedInventory={setSelectedInventory}
                characterHover
                disableEntirehover
                onCharacterClick={() => setProfileApe(ape)}
              />
            ))}
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <ClaimButton
              style={{ width: '205px', height: '72px' }}
              inactive={loading}
              onClick={() => {
                if (!loading) {
                  claimSound()
                  claimAllMissions({
                    addresses: apes
                      .filter(
                        (ape) =>
                          ape.gameData?.activeMissionEffect?.remainingMinutes <=
                          0,
                      )
                      .map((ape) => ape.mint),
                    wallet: publicKey,
                    setMessage,
                    setLoading,
                    cb: (rewards) => {
                      setRewards(rewards)
                      setMissionListDialogOpen(true)
                      reloadApes(rewards.map((reward) => reward.ape.address))
                      reloadAccount()
                    },
                  })
                } else {
                  inactiveSound()
                }
              }}
            >
              {loading ? <Loading isLoading={true} /> : 'CLAIM ALL REWARDS'}
            </ClaimButton>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default CharacterSidebar

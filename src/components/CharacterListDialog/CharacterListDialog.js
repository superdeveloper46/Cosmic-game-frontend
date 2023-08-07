import React, { useState, useEffect, useRef } from 'react'
import CloseButton from '../CloseButton'
import Search from '../Search/Search'
import Dropdown from '../Dropdown'
import Pagination from '../Pagination'
import CharacterList from '../CharacterList/CharacterList'
import filterApes from '../../utils/filter-apes'
import OrganiseModal from '../OrganiseModal/OrganiseModal'
import SearchItemModal from '../SearchItemModal/SearchItemModal'
import { useSelector } from 'react-redux'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'

const filterList = ['Filter Powers', 'Filter Tiers']
const PageSize = 4
const orderList = ['favourite', 'level', 'tier', 'alphabet', 'rarity']
const searchItemList = [
  { item: 'Speed', selected: false },
  { item: 'Perception', selected: false },
  { item: 'Sight', selected: false },
  { item: 'Luck', selected: false },
  { item: 'Agility', selected: false },
  { item: 'Cutting', selected: false },
]

const tierFilters = [
  'All Tiers',
  'Tier 1',
  'Tier 2',
  'Tier 3',
  'Tier 4'
]

const CharacterListDialog = ({ crownedApeId, apes, setProfileApe }) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const [nameFilter, setNameFilter] = useState('')
  const [characterApes, setCharacterApes] = useState(apes)
  const [filterType, setFilterType] = useState(filterList[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchItem, setIsSearchItem] = useState(false)
  const [isOrganiseModal, setIsOrganiseModal] = useState(false)
  const [order, setOrder] = useState(orderList[3])
  const [ascending, setAscending] = useState(true)
  const [searchItems, setSearchItems] = useState(searchItemList)

  const powers = useSelector((state) => state.apes.powers)
  const powerFilters = [
    'All Powers',
    'No Power',
    ...powers.map((power) => power.power),
  ]

  const getOrderData = () => {
    const prevOrder = localStorage.getItem('cosmicOrderCharacter')
    if (prevOrder) setOrder(prevOrder)
    const prevAscending = localStorage.getItem('cosmicAscending')
    if (prevAscending) setAscending(JSON.parse(prevAscending) === true)
  }

  useEffect(() => {
    getOrderData()
    const powerFilter =
      filterType === filterList[0]
        ? powerFilters[currentPage - 1]
        : powerFilters[0]

    const tierFilter =
      filterType === filterList[1]
        ? tierFilters[currentPage - 1]
        : tierFilters[0]

    const filteredApes = filterApes({
      nameFilter,
      powers,
      powerFilter,
      tierFilter: tierFilters.indexOf(tierFilter),
      items: searchItems.filter((x) => x.selected === true).map((y) => y.item),
      apes,
    })
    sortApes([...filteredApes])
  }, [apes, nameFilter, searchItems, filterType, currentPage, order, ascending])

  const handleSetOrder = (item) => {
    localStorage.setItem('cosmicOrderCharacter', item)
    setOrder(item)
  }

  const handleAscending = (item) => {
    localStorage.setItem('cosmicAscending', item)
    setAscending(item)
  }

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize
  //   const lastPageIndex = firstPageIndex + PageSize
  //   return data.slice(firstPageIndex, lastPageIndex)
  // }, [currentPage])

  useEffect(() => {
    if (!!filterType) {
      setCurrentPage(1)
    }
  }, [filterType])

  const sortApes = (apesList) => {
    let sortedList
    switch (order) {
      case 'alphabet':
        sortedList = apesList.sort((a, b) =>
          a.data.name > b.data.name ? 1 : b.data.name > a.data.name ? -1 : 0,
        )
        setCharacterApes(sortedList)
        if (!ascending) setCharacterApes(sortedList.reverse())
        break
      case 'level':
        sortedList = apesList.sort((a, b) =>
          a.gameData.Level.level > b.gameData.Level.level
            ? 1
            : b.gameData.Level.level > a.gameData.Level.level
            ? -1
            : 0,
        )
        setCharacterApes(sortedList)
        if (!ascending) setCharacterApes(apesList.reverse())
        break

      case 'favourite':
        sortedList = [
          ...apesList
            .filter((a) => a.gameData.id !== crownedApeId)
            .sort((a, b) =>
              a.gameData.is_favorited > b.gameData.is_favorited
                ? 1
                : b.gameData.is_favorited > a.gameData.is_favorited
                ? -1
                : 0,
            ),
          ...apesList.filter((a) => a.gameData.id === crownedApeId),
        ]
        setCharacterApes(sortedList)
        if (!ascending) setCharacterApes(sortedList.reverse())
        break

      case 'rarity':
        sortedList = apesList.sort((a, b) =>
          a.gameData.rank > b.gameData.rank
            ? 1
            : b.gameData.rank > a.gameData.rank
            ? -1
            : 0,
        )
        setCharacterApes(sortedList)
        if (!ascending) setCharacterApes(sortedList.reverse())
        break

      case 'tier':
        break

      default:
        break
    }
  }

  return (
    <div 
      className='character-list-dialog-container'
      style={{ width: '28%', minWidth: '28%', maxWidth: '28%' }}
    >
      <div className='d-flex align-items-center tab-title'>
        CHARACTER LIST
        <button
          className='organizer ms-2'
          onClick={() => {
            generalSound()
            setIsOrganiseModal(true)
            setIsSearchItem(false)
          }}
        >
          <img src='/images/organizer.png' alt='organizer' />
        </button>
      </div>
      <div className='custom-border-bottom mb-3'>
        <div className='pb-2'>
          <Search value={nameFilter} onChange={setNameFilter} />
        </div>
      </div>
      <div className='d-flex align-items-center gap-3 flex-wrap'>
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
        {/* <button
          className='search-items'
          onClick={() => {
            setIsSearchItem(true)
            setIsOrganiseModal(false)
          }}
        >
          Search Items
        </button> */}
      </div>
      <CharacterList
        crownedApeId={crownedApeId}
        apes={characterApes}
        setProfileApe={setProfileApe}
      />
      <OrganiseModal
        open={isOrganiseModal}
        order={order}
        ascending={ascending}
        setOrder={handleSetOrder}
        setAscending={handleAscending}
        onClose={() => setIsOrganiseModal(false)}
      />
      <SearchItemModal
        open={isSearchItem}
        searchItems={searchItems}
        setSearchItems={setSearchItems}
        onClose={() => setIsSearchItem(false)}
      />
    </div>
  )
}

export default CharacterListDialog

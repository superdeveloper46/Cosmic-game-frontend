import React, { useState, useEffect, useRef } from 'react'
import CloseButton from '../CloseButton'
import NormalButton from '../NormalButton'
import Pagination from '../Pagination'
import ApplyButton from '../ApplyButton'

const SearchItemModal = ({ open, searchItems, setSearchItems, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchItemsTemp, setSearchItemsTemp] = useState(searchItems)

  const setTemp = (index) => {
    setSearchItemsTemp(
      searchItemsTemp.map((x, i) =>
        i === index ? { ...x, selected: !x.selected } : x,
      ),
    )
  }

  const handleApply = () => {
    setSearchItems(searchItemsTemp)
    onClose()
  }

  const handleClose = () => {
    setSearchItemsTemp(searchItems)
    onClose()
  }

  const handleRemove = () => {
    setSearchItemsTemp(
      searchItemsTemp.map((x, i) => ({ ...x, selected: false })),
    )
  }

  return open ? (
    <div className='organize-modal-container'>
      <div className='d-flex justify-content-center align-items-center mb-3'>
        SEARCH ITEMS
        <CloseButton onClick={handleClose} />
      </div>
      <div className='search-item-pagination'>
        <button className='position-absolute left-0 top-0 search-btn-sm'>
          <img src='/images/search_sm.png' alt='' />
        </button>
        <Pagination
          title={'Equipment'}
          currentPage={currentPage}
          totalCount={16}
          pageSize={4}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div className='search-items-wrap custom-scroll'>
        <div className='d-flex flex-wrap justify-content-between'>
          {searchItemsTemp.map((searchItem, index) => (
            <NormalButton
              key={`search-item-${index}`}
              style={{ marginBottom: '20px', width: '48%' }}
              onClick={() => setTemp(index)}
              inactive={!searchItem.selected}
            >
              {searchItem.item}
            </NormalButton>
          ))}
        </div>
      </div>
      <div>
        <img
          src='/images/PartingLine_Equipment.png'
          alt=''
          className='w-100 mb-4'
        />
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <div style={{ width: '30%' }} />
        <div>Selected Items</div>
        <NormalButton
          style={{ width: '33%', fontSize: '12px' }}
          onClick={() => handleRemove()}
          inactive={false}
        >
          Remove All
        </NormalButton>
      </div>
      <div className='text-center py-3 my-2 select-search'>
        {searchItemsTemp.some((c) => c.selected === true)
          ? searchItemsTemp.map((searchItem, index) =>
              searchItem.selected && (
                <NormalButton
                  key={`remove-lists-${index}`}
                  style={{ width: '30%' }}
                  onClick={() => setTemp(index)}
                  inactive={!searchItem.selected}
                >
                  {searchItem.item}
                </NormalButton>
              )
            )
          : 'Select an item to search'}
      </div>
      <p>
        Selecting two or more options will only display the characters who meet
        all conditions. Select up to three.
      </p>
      <div>
        <img
          src='/images/PartingLine_Equipment.png'
          alt=''
          className='w-100 mb-3'
        />
      </div>
      <ApplyButton
        className='organise-apply mx-auto px-5'
        onClick={handleApply}
      >
        Apply
      </ApplyButton>
    </div>
  ) : (
    <></>
  )
}

export default SearchItemModal

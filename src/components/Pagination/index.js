import React, { useEffect, useState, useRef } from 'react'
import { usePagination } from './usePagination'
import './index.scss'

const Pagination = ({
  title,
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
  itemShow = true,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  const onNext = () => {
    if (currentPage === lastPage) {
      onPageChange(1)
    } else {
      onPageChange(currentPage + 1)
    }
  }

  const onPrevious = () => {
    if (currentPage === 1) {
      onPageChange(lastPage)
    } else {
      onPageChange(currentPage - 1)
    }
  }

  return (
    <div className={`character-pagination ${className}`}>
      <div className='pagination-btns'>
        <button onClick={onPrevious}>
          <img src='/images/move_left.png' alt='left' />
        </button>
        <div className='text-center'>{title}</div>
        <button onClick={onNext}>
          <img src='/images/move_right.png' alt='right' />
        </button>
      </div>
      {itemShow ? (
        <div className='pagination-items'>
          {paginationRange.map((pageNumber) =>
            pageNumber === '...' ? (
              <div>&#8230;</div>
            ) : (
              <div
                key={`pagination-${pageNumber}`}
                className={pageNumber === currentPage ? 'selected' : ''}
                onClick={() => onPageChange(pageNumber)}
              />
            ),
          )}
        </div>
      ) : null}
    </div>
  )
}

export default Pagination

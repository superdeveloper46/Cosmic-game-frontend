import React, { useState } from 'react'

const Search = ({ value, onChange, className }) => {
  return (
    <div className={`d-flex align-items-center character-search ${className}`}>
      <button>
        <img src="/images/search.png" alt="search" />
      </button>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </div> 
  )}

export default Search

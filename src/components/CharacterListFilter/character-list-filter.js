import React from "react"

const CharacterListFilter = ({
  apes,
  setFilteredApes,
  nameFilter,
  setNameFilter,
}) => {

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div style={{ display: 'flex', flex: 1, margin: '0 0.5rem', alignItems: 'center' }}>
        <span><i className="bi bi-search" style={{ fontSize: '18px' }}></i></span>
        <input className="form-control" style={{ flexGrow: 1, marginLeft: '0.5rem' }} value={ nameFilter } onChange={e => setNameFilter(e.target.value)} />
      </div>
    </div>
  )
}

export default CharacterListFilter
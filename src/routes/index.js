import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import MenuPage from '../pages/MenuPage/menu-page'
import Region from '../pages/Region/region'
import ShopPage from '../pages/Shop/shop'
import Settings from '../pages/Settings/settings'

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/region' element={<Region />} />
        <Route path='/characters/list' element={<MenuPage tab='Character' />} />
        <Route path='/characters/level' element={<MenuPage tab='Level' />} />
        <Route path='/characters/evolution' element={<MenuPage tab='Ascension' />} />
        <Route path='/characters/equip' element={<MenuPage tab='Equip' />} />
        <Route path='/characters/repair' element={<MenuPage tab='Repair' />} />
        <Route path='/characters/limitbreak' element={<MenuPage tab='Limit Break' />} />
        <Route path='/characters/inventory' element={<MenuPage tab='Inventory' />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/settings/general' element={<Settings tab={'General'}/>} />
        <Route path='/settings/account' element={<Settings tab={'Account'}/>} />
        <Route path='/settings/key-bindings' element={<Settings tab={'Key Bindings'} />} />
        <Route path='/settings/audio' element={<Settings tab={'Audio'}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
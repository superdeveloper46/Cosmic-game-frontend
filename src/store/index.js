import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import accountReducer from '../slices/accountSlice'
import apeReducer from '../slices/apeSlice'
import missionReducer from '../slices/missionSlice'
import mapReducer from '../slices/mapSlice'
import resourceReducer from '../slices/resourceSlice'
import inventoriesReducer from '../slices/inventorySlice'
import levelReducer from '../slices/levelSlice'
import repairReducer from '../slices/repairSlice'
import currencyReducer from "../slices/curencySlice";
import dialogReducer from "../slices/ItemDialogSlice";
export const store = configureStore({
  reducer: combineReducers({
    accounts: accountReducer,
    apes: apeReducer,
    missions: missionReducer,
    levels: levelReducer,
    maps: mapReducer,
    resources: resourceReducer,
    inventories: inventoriesReducer,
    repair: repairReducer,
    currencies:currencyReducer,
    dialog:dialogReducer
  }),
})
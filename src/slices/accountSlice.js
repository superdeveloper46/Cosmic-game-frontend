import { createSlice } from '@reduxjs/toolkit'
import fetchAccount from '../utils/fetch-account'
import fetchAccountLevels from '../utils/fetch-account-levels'
import updateAccount from '../utils/update-account'
import fetchShopAccountLimits from "../utils/fetch-shop-account-limits";
import fetchShopRefreshTimes from "../utils/fetch-shop-refresh-times";

const initialState = {
  account: null,
  levels: null,
  shopLimits:null,
  shopRefreshTimes:null
}

export const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    getAccount: (state, action) => {
      state.account = action.payload.account || action.payload
    },
    getLevels: (state, action) => {
      state.levels = action.payload.levels || action.payload
    },
    getShopLimits: (state, action) => {
      state.shopLimits = action.payload.shopLimits || action.payload
    },
    getShopRefreshTimes: (state, action) => {
      state.shopRefreshTimes = action.payload.shopRefreshTimes || action.payload
    },
  },
})

export default slice.reducer

export const getAccount = (publicKey) => (dispatch) => {
  fetchAccount(publicKey).then((fetchedAccount) => {
    dispatch(slice.actions.getAccount(fetchedAccount))
  })
}


export  const getShopLimits = (publicKey) => (dispatch) => {

  fetchShopAccountLimits(publicKey).then((fal) => {
    dispatch(slice.actions.getShopLimits(fal))
  })
}

export  const getShopRefreshTimes = () => (dispatch) => {

  fetchShopRefreshTimes().then((srt) => {
    dispatch(slice.actions.getShopRefreshTimes(srt))
  })
}

export const getLevels = () => (dispatch) => {
  fetchAccountLevels().then((fetchedLevels) => {
    dispatch(slice.actions.getLevels(fetchedLevels))
  })
}

export const updateAccountInfo = (publicKey, data) => (dispatch) => {
  updateAccount(publicKey, data)
    .then((res) => {
      if (res?.msg === 'Success') dispatch(getAccount(publicKey))
    })
    .catch((err) => {
      return { msg: err }
    })
}

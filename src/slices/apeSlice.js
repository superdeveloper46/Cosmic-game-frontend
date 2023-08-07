import { createSlice } from '@reduxjs/toolkit'
import fetchEvolutionCosts from '../utils/fetch-evolution-costs'
import fetchNftsByWalletAddress from '../utils/fetch-nfts-by-wallet-address'
import fetchPowerEffects from '../utils/fetch-power-effects'
import fetchPowers from '../utils/fetch-powers'
import storeApesToDB from '../utils/store-apes-to-db'

const initialState = {
  apes: [],
  selectedApes: [],
  focusedApe: {},
  evolutionCosts: [],
  powers: [],
  powerEffects: [],
}

export const slice = createSlice({
  name: 'apes',
  initialState,
  reducers: {
    getApes: (state, action) => {
      state.apes = action.payload
    },
    setSelectedApes: (state, action) => {
      state.selectedApes = action.payload
    },
    setFocusedApe: (state, action) => {
      state.focusedApe = action.payload
    },
    getEvolutionCosts: (state, action) => {
      state.evolutionCosts = action.payload
    },
    getPowers: (state, action) => {
      state.powers = action.payload
    },
    getPowerEffects: (state, action) => {
      state.powerEffects = action.payload
    },
  },
})

export default slice.reducer

export const getApes = (publicKey) => (dispatch) => {
  fetchNftsByWalletAddress(publicKey)
    .then((nfts) => storeApesToDB(nfts, publicKey))
    .then((nfts) => {
      dispatch(slice.actions.getApes(nfts))

      if (nfts.length > 0) {
        dispatch(slice.actions.setSelectedApes([]))
      }
    })
}

export const setSelectedApes = (selected) => (dispatch) => {
  dispatch(slice.actions.setSelectedApes(selected))
}

export const setFocusedApe = (selected) => (dispatch) => {
  dispatch(slice.actions.setFocusedApe(selected))
}

export const setApes = (apes) => (dispatch) => {
  dispatch(slice.actions.getApes(apes))
}

export const getEvolutionCosts = () => (dispatch) => {
  fetchEvolutionCosts().then((fetchedEvolutionCosts) =>
    dispatch(slice.actions.getEvolutionCosts(fetchedEvolutionCosts)),
  )
}

export const getPowerEffects = () => (dispatch) => {
  fetchPowerEffects().then((fetchedPowerEffects) =>
    dispatch(slice.actions.getPowerEffects(fetchedPowerEffects)),
  )
}

export const getPowers = () => (dispatch) => {
  fetchPowers().then((fetchedPowers) =>
    dispatch(slice.actions.getPowers(fetchedPowers)),
  )
}
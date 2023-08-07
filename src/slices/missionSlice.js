import { createSlice } from '@reduxjs/toolkit'
import fetchDifficulties from '../utils/fetch-difficulties'
import fetchMissions from '../utils/fetch-missions'

const initialState = {
  missions: [],
  inventoryMission: null,
  difficulties: null,
}

export const slice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    getMissions: (state, action) => {
      state.missions = action.payload
    },
    setInventoryMission: (state, action) => {
      state.inventoryMission = action.payload
    },
    setDifficulties: (state, action) => {
      state.difficulties = action.payload
    },
  },
})

export default slice.reducer

export const getMissions = () => (dispatch) => {
  fetchMissions().then((fetchedMissions) => {
    dispatch(slice.actions.getMissions(fetchedMissions))
  })
}

export const getDifficulties = () => (dispatch) => {
  fetchDifficulties().then((fetchedDifficulties) => {
    dispatch(slice.actions.setDifficulties(fetchedDifficulties))
  })
}

export const setInventoryMission = mission => dispatch => dispatch(slice.actions.setInventoryMission(mission))
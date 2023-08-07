import { createSlice } from '@reduxjs/toolkit'
import fetchLevels from '../utils/fetch-levels'

const initialState = {
  levels: [],
}

export const slice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    getLevels: (state, action) => {
      state.levels = action.payload
    },
  },
})

export default slice.reducer

export const getLevels = () => (dispatch) => {
  fetchLevels().then((fetchedLevels) => {
    dispatch(slice.actions.getLevels(fetchedLevels))
  })
}


export const setInventoryMission = mission => dispatch => dispatch(slice.actions.setInventoryMission(mission))
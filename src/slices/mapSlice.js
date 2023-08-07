import { createSlice } from '@reduxjs/toolkit'
import fetchMaps from '../utils/fetch-maps'

const initialState = {
  maps: [],
}

export const slice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    getMaps: (state, action) => {
      state.maps = action.payload
    },
  },
})

export default slice.reducer

export const getMaps = () => (dispatch) => {
  fetchMaps().then((fetchedMaps) => {
    dispatch(slice.actions.getMaps(fetchedMaps))
  })
}

import { createSlice } from '@reduxjs/toolkit'
import fetchLevels from '../utils/fetch-levels'

const initialState = {
  status: false,
  selectedItem:null,
  image:null,
}

export const slice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    toggleDialog: (state, action) => {
      state.status = action.payload
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload
    },
    setSelectedImage: (state, action) => {
      state.image = action.payload
    },
  },
})

export default slice.reducer


export const toggleDialog = (dialogToggle) => (dispatch) => {
    dispatch(slice.actions.toggleDialog(dialogToggle))
}

export const setSelectedItem = (item) => (dispatch) => {
  dispatch(slice.actions.setSelectedItem(item))
}

export const setDetailImage = (image) => (dispatch) => {
  dispatch(slice.actions.setSelectedImage(image))
}
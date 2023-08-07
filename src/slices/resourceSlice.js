import { createSlice } from '@reduxjs/toolkit'
import fetchResources from '../utils/fetch-resources'
import fetchAccountResources from "../utils/fetch-account-resources";

const initialState = {
  resources: [],
  selectedExperiences: {},
  accountResources:[]
}

export const slice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    getResources: (state, action) => {
      state.resources = action.payload
    },
    getAccountResources: (state, action) => {
      state.accountResources = action.payload
    },
    pushExperienceItem: (state, action) => {
      const resource = action.payload.resource
      const star = resource.star || 0
      if (!star) return

      state.selectedExperiences = {
        ...state.selectedExperiences,
        [star]: (state.selectedExperiences[star] || 0) + action.payload.count
      }
    },
    popExperienceItem: (state, action) => {
      const resource = action.payload.resource
      const star = resource.star || 0
      if (!star) return

      state.selectedExperiences = {
        ...state.selectedExperiences,
        [star]: (state.selectedExperiences[star] || 0) - action.payload.count
      }
    },
    clearExperienceItem: (state, action) => {
      state.selectedExperiences = {}
    },
  },
})

export default slice.reducer

export const getResources = () => (dispatch) => {
  fetchResources().then((fetchedResources) =>
    dispatch(slice.actions.getResources(fetchedResources)),
  )
}

export const getAccountResources = (publicKey) => (dispatch) => {
  fetchAccountResources(publicKey).then((far) =>
      dispatch(slice.actions.getAccountResources(far)),
  )
}

export const pushExperienceItem = (resource, count) => (dispatch) => {
  dispatch(slice.actions.pushExperienceItem({
    resource,
    count: count || 1
  }))
}

export const popExperienceItem = (resource, count) => (dispatch) => {
  dispatch(slice.actions.popExperienceItem({
    resource,
    count: count || 1
  }))
}

export const clearExperienceItem = () => (dispatch) => {
  dispatch(slice.actions.clearExperienceItem())
}
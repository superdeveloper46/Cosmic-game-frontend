import { createSlice } from '@reduxjs/toolkit'
import fetchResources from '../utils/fetch-resources'
import fetchAccountResources from "../utils/fetch-account-resources";
import fetchCurrencies from "../utils/fetch-currencies";

const initialState = {
  currencies: [],
}

export const slice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    getCurrencies: (state, action) => {
      state.currencies = action.payload
    }
  },
})

export default slice.reducer

export const getCurrencies = () => (dispatch) => {
  fetchCurrencies().then((fetchedCurrencies) =>
    dispatch(slice.actions.getCurrencies(fetchedCurrencies)),
  )
}

import { createSlice } from "@reduxjs/toolkit";
import fetchLimitBreakRecipes from "../utils/fetch-limit-break-recipes";
import fetchInventories from "../utils/fetch-inventories";
import fetchRepairCosts from "../utils/fetch-repair-costs";
import reloadInventory from "../utils/reload-inventory";

const initialState = {
  selectedInventory: null,
  selectedRecipe: null,
  limitBreakRecipes: [],
  repairCosts: [],
  inventories: [],
  loading: false,
  isMoreAvailable: false,
};

export const slice = createSlice({
  name: "inventories",
  initialState,
  reducers: {
    setSelectedInventory: (state, action) => {
      state.selectedInventory = action.payload;
    },
    setSelectedRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
    },
    getLimitBreakResources: (state, action) => {
      state.limitBreeakRecipes = action.payload;
    },
    getRepairCosts: (state, action) => {
      state.repairCosts = action.payload;
    },
    setInventories: (state, action) => {
      state.inventories = action.payload;
    },
    addInventories: (state, action) => {
      state.inventories = [...state.inventories, ...action.payload || []];
    },
    clearInventories: (state, action) => {
      state.inventories = [];
    },
    updateInventory: (state, action) => {
      if (!!action.payload) {
        state.inventories = state.inventories.map((inventory) =>
          inventory.inv_id !== action.payload.inv_id
            ? inventory
            : action.payload
        );
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsMoreAvailable: (state, action) => {
      state.isMoreAvailable = action.payload;
    },
  },
});

export default slice.reducer;

export const setSelectedInventory = (inventory) => (dispatch) => {
  dispatch(slice.actions.setSelectedInventory(inventory));
};

export const setSelectedRecipe = (recipe) => (dispatch) => {
  dispatch(slice.actions.setSelectedRecipe(recipe));
};

export const getLimitBreakResources = () => (dispatch) => {
  fetchLimitBreakRecipes().then((fetchedLimitBreakRecipes) =>
    dispatch(slice.actions.getLimitBreakResources(fetchedLimitBreakRecipes))
  );
};

export const getRepairCosts = () => (dispatch) => {
  fetchRepairCosts().then((fetchedRepairCosts) =>
    dispatch(slice.actions.getRepairCosts(fetchedRepairCosts))
  );
};

export const clearInventories = () => (dispatch) => {
  dispatch(slice.actions.clearInventories());
};

export const fetchMoreInventories =
  ({ address, type, subType, after, count }) =>
  (dispatch) => {
    dispatch(slice.actions.setLoading(true));

    fetchInventories({
      address,
      type,
      subType,
      after,
      count,
    }).then((fetchedInventories) => {
      dispatch(slice.actions.setLoading(false));
      dispatch(
        slice.actions.setIsMoreAvailable(
          !!fetchedInventories?.metadata?.isNextAvailable
        )
      );
      if (after === 0) {
        dispatch(slice.actions.setInventories(fetchedInventories?.data || []));
      } else {
        dispatch(slice.actions.addInventories(fetchedInventories?.data || []));
      }
    });
  };

export const refetchInventory = (inventory) => (dispatch) => {
  reloadInventory({
    inventoryId: inventory.inv_id || inventory.id,
  }).then((fetchedInventory) => {
    dispatch(slice.actions.updateInventory(fetchedInventory));
  });
};

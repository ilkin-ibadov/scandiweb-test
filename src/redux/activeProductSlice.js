import { createSlice } from "@reduxjs/toolkit";

export const activeProductSlice = createSlice({
    name: 'activeProduct',
    initialState: {
      product: null
    },
    reducers: {
      addActiveProduct: (state, action) => {
        state.product = action.payload
      }
    }
  })

  export const { addActiveProduct } = activeProductSlice.actions

  export default activeProductSlice.reducer
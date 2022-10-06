import { createSlice, current } from "@reduxjs/toolkit";

export const activeCurrencySlice = createSlice({
    name: 'activeCurrency',
    initialState: {
      currency: '$'
    },
    reducers: {
      addActiveCurrency: (state, action) => {
        state.currency = action.payload
        console.log(current(state))
      }
    }
  })

  export const { addActiveCurrency } = activeCurrencySlice.actions

  export default activeCurrencySlice.reducer
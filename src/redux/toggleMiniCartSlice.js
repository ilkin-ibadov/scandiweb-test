import { createSlice, current } from "@reduxjs/toolkit";

export const toggleMiniCartSlice = createSlice({
    name: 'miniCartState',
    initialState: {
      class: ''
    },
    reducers: {
      toggleMiniCart: (state, action) => {
        state.class = action.payload
      }
    }
  })

  export const { toggleMiniCart } = toggleMiniCartSlice.actions

  export default toggleMiniCartSlice.reducer
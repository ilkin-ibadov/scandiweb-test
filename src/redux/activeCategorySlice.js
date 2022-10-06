import { createSlice, current } from "@reduxjs/toolkit";

export const activeCategorySlice = createSlice({
    name: 'activeCategory',
    initialState: {
      category: ''
    },
    reducers: {
      addActiveCategory: (state, action) => {
        state.category = action.payload

      }
    }
  })

  export const { addActiveCategory } = activeCategorySlice.actions

  export default activeCategorySlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import activeProductReducer from './activeProductSlice'
import activeCategoryReducer from './activeCategorySlice'
import activeCurrencyReducer from './activeCurrencySlice'
import toggleMiniCartReducer from './toggleMiniCartSlice'
import cartReducer from './cartSlice'


export const store = configureStore({
  reducer: {
      activeProduct: activeProductReducer,
      activeCategory: activeCategoryReducer,
      activeCurrency: activeCurrencyReducer,
      cart: cartReducer,
      miniCartState: toggleMiniCartReducer
  },
})
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './modules/counter'
import recommendSlice from '../views/discover/c-views/recommend/store/recommend'
import playerSlice from '../views/player/store/player'
const store = configureStore({
  reducer: {
    counter: counterSlice,
    recommend: recommendSlice,
    player: playerSlice
  }
})
export type FnReturnType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

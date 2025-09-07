import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import hyRequest from '@/service'
import {
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getPlaylistDetail,
  getArtistList
} from '../service/recommend'
export const fetchBannerDataAction = createAsyncThunk('banners', async () => {
  const res = await getBanners()
  // console.log('res', res)
  return res.banners
})
export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async () => {
    const res = await getHotRecommend({ limit: 8 })
    // console.log('res', res)
    return res.result
  }
)
export const fetchNewAlbumAction = createAsyncThunk('newAlbum', async () => {
  const res = await getNewAlbum()
  // console.log('res', res)
  return res.albums
})
const rankingIds = [19723756, 3779629, 2884035]
export const fetchPlaylistDetailAction = createAsyncThunk(
  'playlistDetail',
  async () => {
    const promises = []
    for (const id of rankingIds) {
      promises.push(getPlaylistDetail(id))
    }
    const playlists = (await Promise.all(promises)).map((item) => {
      return item.playlist
    })
    return playlists
  }
)
export const fetchSettleSingerAction = createAsyncThunk(
  'settleSinger',
  async () => {
    const res = await getArtistList()
    return res.artists
  }
)

interface IRecommendState {
  banners: any
  hotRecommend: any
  newAlbums: any
  rankings: any
  settleSingers: any
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommend: [],
  newAlbums: [],
  rankings: [],
  settleSingers: []
}
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
      state.banners = payload
    })
    builder.addCase(fetchHotRecommendAction.fulfilled, (state, { payload }) => {
      state.hotRecommend = payload
    })
    builder.addCase(fetchNewAlbumAction.fulfilled, (state, { payload }) => {
      state.newAlbums = payload
    })
    builder.addCase(
      fetchPlaylistDetailAction.fulfilled,
      (state, { payload }) => {
        state.rankings = payload
      }
    )
    builder.addCase(fetchSettleSingerAction.fulfilled, (state, { payload }) => {
      state.settleSingers = payload
    })
  }
})
export default recommendSlice.reducer

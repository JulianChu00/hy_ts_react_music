import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'
import { ILyric, parseLyric } from '@/utils/parse-lyric'
import type { FnReturnType } from '@/store/index'
interface IThunkState {
  state: FnReturnType
}
export const fetchCurrentSongAction = createAsyncThunk<
  any,
  number,
  IThunkState
>('currentSong', async (id: number, { dispatch, getState }) => {
  // 获取播放列表
  const playSongList = getState().player.playSongList
  // 获取当前播放歌曲是否存在播放列表
  const findIndex = playSongList.findIndex((item) => item.id === id)
  //如果不存在
  console.log('getSongLyric:', getSongLyric)

  if (findIndex === -1) {
    const songRes = await getSongDetail(id)
    // if (!songRes.songs.length) return { song: {}, lyrics: [] as ILyric[] }
    const song = songRes.songs[0]
    const newSongList = [...playSongList]
    newSongList.push(song)
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongListAction(newSongList))
    dispatch(changePlaySongIndexAction(newSongList.length - 1))
  } else {
    //如果存在
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
  }
  const res = await getSongLyric(id)
  if (res?.lrc?.lyric) {
    const lyrics = parseLyric(res.lrc.lyric)
    dispatch(changeLyricsAction(lyrics))
  }
})
export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changeMusic',
  async (isNext: boolean, { dispatch, getState }) => {
    const playMode = getState().player.playMode
    const songIndex = getState().player.playSongIndex
    const songList = getState().player.playSongList
    let newIndex = songIndex
    if (playMode === 1) {
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex > getState().player.playSongList.length - 1) {
        newIndex = 0
      } else if (newIndex < 0) {
        newIndex = getState().player.playSongList.length - 1
      }
    }

    const song = songList[newIndex]
    const res = await getSongLyric(song.id)
    if (res?.lrc?.lyric) {
      const lyrics = parseLyric(res.lrc.lyric)
      dispatch(changeLyricsAction(lyrics))
    }
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(newIndex))
  }
)
interface IPlayerStore {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}
const initialState: IPlayerStore = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [
    {
      name: 'Booty Call',
      mainTitle: null,
      additionalTitle: null,
      id: 28754103,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 10559,
          name: '张惠妹',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 80,
      st: 0,
      rt: null,
      fee: 8,
      v: 80,
      crbt: null,
      cf: '',
      al: {
        id: 2878422,
        name: '偏执面',
        picUrl:
          'https://p1.music.126.net/R3QLz43nYuEGlK4ucAaNAg==/109951167256508748.jpg',
        tns: [],
        pic_str: '109951167256508748',
        pic: 109951167256508750
      },
      dt: 189736,
      h: {
        br: 320000,
        fid: 0,
        size: 7592272,
        vd: -50114,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 4555381,
        vd: -47629,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3036935,
        vd: -46046,
        sr: 44100
      },
      sq: {
        br: 1744022,
        fid: 0,
        size: 41363011,
        vd: -50088,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 8,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 46,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      displayTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 344004,
      mst: 9,
      cp: 7003,
      rtype: 0,
      rurl: null,
      publishTime: 1404230400000
    },
    {
      name: '起风了',
      mainTitle: null,
      additionalTitle: null,
      id: 1330348068,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 12085562,
          name: '买辣椒也用券',
          tns: [],
          alias: []
        }
      ],
      alia: ['原曲：《ヤキモチ》—高桥优'],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 82,
      crbt: null,
      cf: '',
      al: {
        id: 74715426,
        name: '起风了',
        picUrl:
          'https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg',
        tns: [],
        pic_str: '109951163699673355',
        pic: 109951163699673360
      },
      dt: 325868,
      h: {
        br: 320000,
        fid: 0,
        size: 13037236,
        vd: -77525,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7822359,
        vd: -74987,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 5214920,
        vd: -73491,
        sr: 44100
      },
      sq: {
        br: 986139,
        fid: 0,
        size: 40168924,
        vd: -77539,
        sr: 44100
      },
      hr: {
        br: 2832352,
        fid: 0,
        size: 115371677,
        vd: -77476,
        sr: 88200
      },
      a: null,
      cd: '1',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17716740096,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 48,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      displayTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 1415923,
      publishTime: 1543766400000
    }
  ],
  playSongIndex: -1,
  playMode: 0 //0顺序 1随机 2单曲
}
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricIndex(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }
  }
})
export default playerSlice.reducer
export const {
  changeLyricIndex,
  changeCurrentSongAction,
  changePlaySongIndexAction,
  changePlaySongListAction,
  changeLyricsAction,
  changePlayModeAction
} = playerSlice.actions

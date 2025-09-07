import { memo, ReactNode, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Slider, message } from 'antd'
import {
  PlayerBarWrapper,
  BarControl,
  BarPlayerInfo,
  BarOperator
} from './style'
import {
  changeLyricIndex,
  changePlayModeAction,
  changeMusicAction
} from '../store/player'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { getImageSize, formatTime } from '@/utils/format'
import { getSongPlayUrl } from '@/utils/handle-player'
import { AppDispatch } from '@/store'
interface IProps {
  children?: ReactNode
}
const AppPlayerBar = (_props: IProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const { currentSong, lyrics, lyricIndex, playMode } = useSelector(
    (state: any) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqual
  )
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
        console.log('歌曲播放成功')
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log('歌曲播放失败:', err)
      })

    setDuration(currentSong?.dt)
  }, [currentSong])
  const [messageApi, contextHolder] = message.useMessage()
  const handleTimeUpdate = () => {
    const currentTime: number = audioRef.current!.currentTime * 1000
    if (!isSliding) {
      const process = (currentTime / duration) * 100
      setCurrentTime(currentTime)
      setProgress(process)
    }
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }
    if (lyricIndex !== index && index !== -1) {
      dispatch(changeLyricIndex(index))
      messageApi.open({
        content: lyrics[index].text,
        key: 'lyric',
        duration: 0
      })
      console.log(index)
    }
  }
  function handlePlayBtnClick() {
    // 1.控制播放器的播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))
    // 2.改变isPlaying的状态
    setIsPlaying(!isPlaying)
  }
  function handleSliderChanging(value: number) {
    const currentTime = (value / 100) * duration
    audioRef.current!.currentTime = currentTime / 1000
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(true)
  }
  function handleSliderChanged(value: number) {
    const currentTime = (value / 100) * duration
    audioRef.current!.currentTime = currentTime / 1000
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }
  function handleChangePlayMode() {
    const mode = (playMode + 1) % 3
    dispatch(changePlayModeAction(mode))
  }
  function handleChangeMusic(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }
  function handleTimeEnded() {
    if (playMode !== 2) {
      handleChangeMusic(true)
    } else {
      audioRef.current!.currentTime = 0
      audioRef.current!.play()
    }
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      {contextHolder}
      <div className="content wrap-v2">
        <BarControl $isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => {
              handleChangeMusic(false)
            }}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={() => {
              handlePlayBtnClick()
            }}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => {
              handleChangeMusic(true)
            }}
          ></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl, 50)}
            ></img>
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="song-singer">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                step={0.2}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onChangeComplete={handleSliderChanged}
              ></Slider>
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="total">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator $playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handleChangePlayMode}
            ></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      ></audio>
    </PlayerBarWrapper>
  )
}
export default memo(AppPlayerBar)

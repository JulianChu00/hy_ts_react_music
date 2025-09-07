import { useRoutes } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import routes from './router'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store'
import { fetchCurrentSongAction } from '@/views/player/store/player'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(28754106))
  }, [])
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <Suspense fallback={<div>loading...</div>}>{useRoutes(routes)}</Suspense>
      <AppFooter></AppFooter>
      <AppPlayerBar></AppPlayerBar>
    </div>
  )
}

export default App

import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
const Discover = lazy(() => import('@/views/discover/index'))
const Recommend = lazy(() => import('@/views/discover/c-views/recommend/index'))
const Album = lazy(() => import('@/views/discover/c-views/album/index'))
const Artist = lazy(() => import('@/views/discover/c-views/artist/index'))
const Songs = lazy(() => import('@/views/discover/c-views/songs/index'))
const Ranking = lazy(() => import('@/views/discover/c-views/ranking/index'))
const Djradio = lazy(() => import('@/views/discover/c-views/djradio/index'))
const Download = lazy(() => import('@/views/download/index'))
const Focus = lazy(() => import('@/views/focus/index'))
const Mine = lazy(() => import('@/views/mine/index'))
// import Discover from '@/views/discover/index'
// import Download from '@/views/download/index'
// import Focus from '@/views/focus/index'
// import Mine from '@/views/mine/index'
const routes = [
  {
    path: '/',
    element: <Navigate to="/discover"></Navigate>
  },
  {
    path: '/discover',
    element: <Discover></Discover>,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend"></Navigate>
      },
      {
        path: '/discover/recommend',
        element: <Recommend></Recommend>
      },
      {
        path: '/discover/album',
        element: <Album></Album>
      },
      {
        path: '/discover/artist',
        element: <Artist></Artist>
      },
      {
        path: '/discover/songs',
        element: <Songs></Songs>
      },
      {
        path: '/discover/ranking',
        element: <Ranking></Ranking>
      },
      {
        path: '/discover/djradio',
        element: <Djradio></Djradio>
      }
    ]
  },
  {
    path: '/download',
    element: <Download></Download>
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/mine',
    element: <Mine />
  }
]

export default routes

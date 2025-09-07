import hyRequest from '@/service'

export function getBanners() {
  return hyRequest.request({
    url: '/banner',
    method: 'get'
  })
}
export function getHotRecommend({ limit = 30 }) {
  return hyRequest.request({
    url: '/personalized',
    method: 'get',
    params: {
      limit
    }
  })
}
export function getNewAlbum() {
  return hyRequest.request({
    url: '/album/newest',
    method: 'get'
  })
}
export function getPlaylistDetail(id: number) {
  return hyRequest.request({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id
    }
  })
}
export function getArtistList(limit = 5) {
  return hyRequest.request({
    url: '/artist/list',
    method: 'get',
    params: {
      limit
    }
  })
}

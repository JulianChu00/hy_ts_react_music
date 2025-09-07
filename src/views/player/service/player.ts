import hyRequest from '@/service'
export function getSongDetail(ids: number) {
  return hyRequest.request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids
    }
  })
}
export function getSongLyric(id: number) {
  return hyRequest.request({
    url: '/lyric',
    method: 'get',
    params: {
      id
    }
  })
}

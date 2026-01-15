import request from '@/utils/request'

const HITOKOTO_API = import.meta.env.VITE_HITOKOTO_API || 'https://v1.hitokoto.cn/'
const MUSIC_SERVE = import.meta.env.VITE_MUSIC_SERVE || 'http://47.113.117.43:3000'

// 获取一言
export const getHitokoto = () => {
  return request.get(HITOKOTO_API)
}

// 获取音乐搜索结果
export const searchMusic = (keywords: string) => {
  return request.get(`${MUSIC_SERVE}/cloudsearch?keywords=${keywords}`)
}

// 获取音乐URL
export const getMusicUrl = (id: number) => {
  return request.get(`${MUSIC_SERVE}/song/url/v1?id=${id}&level=exhigh`)
}

// 获取歌词
export const getLyric = (id: number) => {
  return request.get(`${MUSIC_SERVE}/lyric?id=${id}`)
}

// 获取音乐详情
export const getMusicDetail = (ids: string) => {
  return request.get(`${MUSIC_SERVE}/song/detail?ids=${ids}`)
}


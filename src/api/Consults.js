import Api from '../utils/axios'

export function fetchNews(params) {
  return Api({
    url: '/news',
    method: 'GET',
    params: params,
  })
}

export function fetchNoticeList(params) {
  return Api({
    url: '/notices',
    method: 'GET',
    params: params,
  })
}
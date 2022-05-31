import Api from '../utils/axios'

export function fetchUsers(params) {
  return Api({
    url: '/users',
    method: 'GET',
    params: params,
  })
}
import Api from '../utils/axios'

export function fetchAdminList(params) {
  return Api({
    url: '/admin/information/getAllAdminByPage',
    method: 'GET',
    params: params,
  })
}

export function fetchRoles(params) {
  return Api({
    url: '/admin/role/getAllRoleByPage',
    method: 'GET',
    params: params,
  })
}

export function fetchAuthority(params) {
  return Api({
    url: '/admin/authority',
    method: 'GET',
    params: params,
  })
}
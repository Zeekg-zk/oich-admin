import Api from '../utils/axios'

// 获取非遗项目列表
export function projectList(params) {
  return Api({
    url: '/projects',
    method: 'GET',
    params: params,
  })
}

// 获取类别列表
export function fetchCategoryList(params) {
  return Api({
    url: '/projects/classification',
    method: 'GET',
    params: params,
  })
}

// 获取传承人列表
export function fetchInheritorList(params) {
  return Api({
    url: '/inheritor',
    method: 'GET',
    params: params,
  })
}

// 获取地区信息
export function fetchRegion(params) {
  return Api({
    url: '/region',
    method: 'GET',
    params: params,
  })
}

// 获取保护单位列表
export function fetchProtectedUnit(params) {
  return Api({
    url: '/protectedUnit',
    method: 'GET',
    params: params,
  })
}

// 获取审核规则信息
export function fetchRules(params) {
  return Api({
    url: '/rules',
    method: 'GET',
    params: params,
  })
}
import request from '@/utils/request'

export function getList(current, size, data) {
  return request({
    url: `/userservice/user/users/${current}/${size}`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/userservice/user/del/${id}`,
    method: 'delete'
  })
}

export function add(data) {
  return request({
    url: '/userservice/user/add',
    method: 'post',
    data
  })
}

export function upd(data) {
  return request({
    url: '/userservice/user/updById',
    method: 'put',
    data
  })
}

export function getUser(id) {
  return request({
    url: `/userservice/user/getById/${id}`,
    method: 'get'
  })
}

export function exportExcel(data) {
  return request({
    url: '/userservice/user/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

export function getMgrUser() {
  return request({
    url: '/userservice/user/getMgrUser',
    method: 'get'
  })
}



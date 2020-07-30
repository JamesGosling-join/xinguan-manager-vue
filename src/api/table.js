import request from '@/utils/request'

export function getList(current, size, data) {
  return request({
    url: `//localhost:8001/user/users/${current}/${size}`,
    method: 'post',
    data
  })
}

export function getDepartment() {
  return request({
    url: '//localhost:8002/department/getDepartment',
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: `//localhost:8001/user/del/${id}`,
    method: 'delete'
  })
}

export function add(data) {
  return request({
    url: '//localhost:8001/user/add',
    method: 'post',
    data
  })
}

export function upd(data) {
  return request({
    url: '//localhost:8001/user/updById',
    method: 'put',
    data
  })
}

export function getUser(id) {
  return request({
    url: `//localhost:8001/user/getById/${id}`,
    method: 'get'
  })
}

export function exportExcel(data) {
  return request({
    url: '//localhost:8001/user/export',
    method: 'post',
    data,
    responseType:'blob'
  })
}



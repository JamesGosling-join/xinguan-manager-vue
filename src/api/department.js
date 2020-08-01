import request from '@/utils/request'

export function getDepartment() {
  return request({
    url: '/departmentservice/department/getDepartment',
    method: 'get'
  })
}

export function findAll(current, size, name) {
  return request({
    url: `/departmentservice/department/findAll/${current}/${size}`,
    method: 'get',
    params: {
      name
    }
  })
}


export function findDepartmentById(id) {
  return request({
    url: `/departmentservice/department/findDepartmentById/${id}`,
    method: 'get'
  })
}

export function delById(id) {
  return request({
    url: `/departmentservice/department/delById/${id}`,
    method: 'delete'
  })
}

export function add(data) {
  return request({
    url: '/departmentservice/department/add',
    method: 'post',
    data
  })
}

export function updById(data) {
  return request({
    url: '/departmentservice/department/updById',
    method: 'put',
    data
  })
}

export function exportExcel(name) {
  return request({
    url: '/userservice/department/export',
    method: 'get',
    params: {
      name
    },
    responseType: 'blob'
  })
}



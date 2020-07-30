import request from '@/utils/request'

export function login(data) {
  return request({
    url: '//localhost:8001/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '//localhost:8001/login/user',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '//localhost:8001/login/loginOut',
    method: 'post'
  })
}


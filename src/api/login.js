import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/userservice/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/userservice/login/user',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/userservice/login/loginOut',
    method: 'post'
  })
}


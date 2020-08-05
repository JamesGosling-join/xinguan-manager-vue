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

export function sendSMS(phoneNumber) {
  return request({
    url: '/userservice/login/sendSMS',
    method: 'post',
    params: {
      phoneNumber
    }
  })
}

export function register(data) {
  return request({
    url: '/userservice/login/register',
    method: 'post',
    data
  })
}


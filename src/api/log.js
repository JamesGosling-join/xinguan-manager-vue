import request from '@/utils/request'

export function getLoginList(current, size, data) {
  return request({
    url: `/logservice/loginLog/findAllLog/${current}/${size}`,
    method: 'post',
    data
  })
}

export function deleteLoginLogById(data) {
  return request({
    url: '/logservice/loginLog/deleteById',
    method: 'post',
    data
  })
}

export function getLogList(current, size, data) {
  return request({
    url: `/logservice/log/findAllLog/${current}/${size}`,
    method: 'post',
    data
  })
}

export function deleteLogById(data) {
  return request({
    url: '/logservice/log/deleteById',
    method: 'post',
    data
  })
}

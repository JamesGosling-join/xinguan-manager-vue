import request from '@/utils/request'

export function findAll(current, size, data) {
  return request({
    url: `/repertoryservice/bizProduc/${current}/${size}`,
    method: 'post',
    data
  })

}export function findCategory() {
  return request({
    url: '/repertoryservice/bizProductCategory',
    method: 'get'
  })
}

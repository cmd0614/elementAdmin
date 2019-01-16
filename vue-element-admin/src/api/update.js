import request from '@/utils/request'

export function update(data) {
  // console.log(params, 'params----')
  return request({
    url: '/users/update', // 假地址 自行替换
    method: 'post',
    data
  })
}

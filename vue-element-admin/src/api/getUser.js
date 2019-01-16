import request from '@/utils/request'
// 获取用户信息
export function getUserList(params) {
  return request({
    url: '/users/list', // 假地址 自行替换
    method: 'get',
    params
  })
}

// 删除用户
export function deleteUser(data) {
  return request({
    url: '/users/action', // 假地址 自行替换
    method: 'delete',
    data
  })
}

// 分配角色权限
export function modifyRolers(data) {
  return request({
    url: '/users/action', // 假地址 自行替换
    method: 'put',
    data
  })
}

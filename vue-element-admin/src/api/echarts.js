export function echarts() {
  return request({
    url: '/users/commit',
    method: 'post',
    data
  })
}
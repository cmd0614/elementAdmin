// 引入api下面请求用户列表的方法
import { getUserList } from '@/api/getUser'
const state = {
  list: []
}

const mutations = {
  updata(state, list) {
    // console.log(state, list, 'list')
    state.list = list
  }
}

const actions = {
  getUserlist({ commit }, query) {
    console.log(query, 'query')
    return new Promise((resolve, reject) => {
      getUserList(query).then(res => {
        // console.log(res, 'res...')
        commit('updata', res.data.data.list)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

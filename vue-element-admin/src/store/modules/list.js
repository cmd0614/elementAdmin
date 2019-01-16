// 引入api下面请求用户列表的方法
import { getUserList, deleteUser, modifyRolers } from '@/api/getUser'
import {update} from '@/api/update'
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
  // 获取用户列表
  getUserlist({ commit }, query) {
    return new Promise((resolve, reject) => {
      getUserList(query).then(res => {
        // console.log(res, 'res...')
        commit('updata', res.data.data.list)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 更改用户信息
  updateList({ commit }, query) {
    return new Promise((resolve, reject) => {
      update(query).then(res => {
        console.log(res, 'res////')
        if (res.data.code === 1) {
          resolve(res.data.msg)
        } else {
          reject(res.data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 删除用户
  deleteUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      deleteUser(data).then(res => {
        if (res.data.code === 1) {
          resolve(res.data.msg)
        } else {
          reject(res.data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 分配用户权限
  modifyRolers(context, data) {
    return new Promise((resolve, reject) => {
      modifyRolers(data).then(res => {
        if (res.data.code === 1) {
          resolve(res.data.msg)
        } else {
          reject(res.data.msg)
        }
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

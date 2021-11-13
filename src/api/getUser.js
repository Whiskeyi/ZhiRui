import axios from 'axios'

export function getUser() {
  return axios({
    url: 'http://sc.zhuchj.com/user/showAllUserInf',
    method: 'post'
  })
}

export function userNum() {
  return axios({
    url: 'http://sc.zhuchj.com/user/userCount',
    method: 'post'
  })
}

// export function changePassword(header, data) {
//   return axios({
//     url: 'http://sc.zhuchj.com/user/updatePassword',
//     method: 'post',
//     headers: { header },
//     data: data
//   })
// }

export function changePassword(data) {
  return axios({
    url: 'http://sc.zhuchj.com/user/updateUserPassword',
    method: 'post',
    data: data
  })
}

export function changeRole(data) {
  return axios({
    url: 'http://sc.zhuchj.com/user/updateRole',
    method: 'post',
    data: data
  })
}

export function userDel(data) {
  return axios({
    url: 'http://sc.zhuchj.com/user/deleteUser',
    method: 'post',
    data
  })
}

export function getDetail(data) {
  return axios({
    url: 'http://sc.zhuchj.com/user/showUserLendRecords',
    method: 'post',
    data
  })
}

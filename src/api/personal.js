import axios from 'axios'

export function rePassword(data, token) {
  return axios({
    url: 'http://sc.zhuchj.com/user/updatePassword',
    method: 'post',
    data: data,
    headers: { token: token }
  })
}

export function getContext() {
  return axios({
    url: 'http://sc.zhuchj.com/user/showAllFeedback',
    method: 'post'
  })
}

export function personalInfo(token) {
  return axios({
    url: 'http://sc.zhuchj.com/user/showUserInf',
    method: 'post',
    headers: { token: token }
  })
}

export function perChange(data, token) {
  return axios({
    url: 'http://sc.zhuchj.com/user/updateUserInf',
    method: 'post',
    data,
    headers: { token: token }
  })
}

export function getAvatar(token) {
  return axios({
    url: 'http://sc.zhuchj.com/user/showHeadImg',
    method: 'post',
    headers: { token: token }
  })
}

export function upAvatar(data, token) {
  return axios({
    url: 'http://sc.zhuchj.com/user/uploadHeadImg',
    method: 'post',
    data,
    headers: { token: token }
  })
}

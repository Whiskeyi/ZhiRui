import axios from 'axios'

export function userlogin(data) {
  return axios({
    url: 'http://sc.zhuchj.com/user/login',
    method: 'post',
    data: data
  })
}

export function userinfo(data) {
  return axios({
    url: 'http://sc.zhuchj.com/user/ManShowUserInf',
    method: 'post',
    data: data
  })
}

export function devinfo(token) {
  return axios({
    url: 'http://sc.zhuchj.com/org/showMemberInf',
    method: 'post',
    headers: { token: token }
  })
}

export function getVerifyCode() {
  return axios({
    url: 'http://sc.zhuchj.com/user/getVerifyCode',
    method: 'post'
  })
}

export function checkVerityCode(data) {
  return axios({
    url: 'http://sc.zhuchj.com/user/checkVerifyCode',
    method: 'post',
    // dataType: 'jsonp',
    // xhrFields: { withCredentials: false },
    data: data
  })
}


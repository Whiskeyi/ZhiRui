import axios from 'axios'

export function invenInf() {
  return axios({
    url: 'http://sc.zhuchj.com/user/checkEqu',
    method: 'post'
  })
}

export function invenCheck(data) {
  return axios({
    url: 'http://sc.zhuchj.com/user/passCheckEqu ',
    method: 'post',
    data
  })
}

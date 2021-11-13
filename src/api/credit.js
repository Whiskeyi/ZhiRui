import axios from 'axios'

export function creditList() {
  return axios({
    url: 'http://sc.zhuchj.com/user/sortByCreditPoint',
    method: 'post'
  })
}

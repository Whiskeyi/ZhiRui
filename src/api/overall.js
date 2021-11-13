import axios from 'axios'

export function getOverall(data) {
  return axios({
    url: 'http://sc.zhuchj.com/equipment/getCount',
    method: 'post',
    data: data
  })
}

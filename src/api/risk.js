import axios from 'axios'

export function getDevRisk() {
  return axios({
    url: 'http://sc.zhuchj.com/equipment/findBreakEqu',
    method: 'post'
  })
}

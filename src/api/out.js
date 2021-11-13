import axios from 'axios'

// export function nestList() {
//   return axios({
//     url: 'http://sc.zhuchj.com/equipment/getRecordsList',
//     method: 'post'
//   })
// }

export function nestInfo() {
  return axios({
    url: 'http://sc.zhuchj.com/org/showOrgRecords',
    method: 'post'
  })
}

export function nestChange(data) {
  return axios({
    url: 'http://sc.zhuchj.com/equipment/passOrgReq',
    method: 'post',
    data: data
  })
}

export function nestRefuse(data) {
  return axios({
    url: 'http://sc.zhuchj.com/equipment/refuseOrgReq',
    method: 'post',
    data: data
  })
}


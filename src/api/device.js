import axios from 'axios'

export function devStorage(data) {
  return axios({
    url: 'http://sc.zhuchj.com/equipment/uploadData',
    method: 'post',
    data: data
  })
}

export function devInfo() {
  return axios({
    url: 'http://sc.zhuchj.com/equipment/showAllEquipment',
    method: 'post'
  })
}

export function devSend(data) {
  return axios({
    url: 'http://sc.zhuchj.com/equipment/sendEmail',
    method: 'post',
    data: data
  })
}

export function devChange(data) {
  return axios({
    url: 'http://sc.zhuchj.com/equipment/updateData',
    method: 'post',
    data: data
  })
}

export function devDel(data) {
  return axios({
    url: 'http://sc.zhuchj.com/equipment/DeleteData',
    method: 'post',
    data
  })
}

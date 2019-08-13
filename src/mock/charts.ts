/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 16:56:16
 * @LastEditTime: 2019-08-13 22:27:58
 * @LastEditors: Please set LastEditors
 */
import * as dayjs from 'dayjs'
const visitData:any = []
const beginDay = new Date().getTime()
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]

for (let i = 0; i < fakeY.length; i++) {
  visitData.push({
    x: dayjs(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i]
  })
}

const salesData:any = []
for (let i = 0; i < 12; i++) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  
}

const searchData:any = []
for (let i = 0; i < 50; i++) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  })
}

const offlineData:any = []
for (let i = 0; i < 10; i++) {
  offlineData.push({
    name: `门店 ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10
  })
}
const offlineChartData: any = []
for (let i = 0; i < 20; i++) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 60 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10
  })
  
}

export default {
  fakeChartData() {
    return {
      visitData,
      salesData,
      searchData,
      offlineData,
      offlineChartData
    }
  }
}

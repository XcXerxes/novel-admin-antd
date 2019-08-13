import * as Mock from 'mockjs'

const tags = Mock.mock({
  'list|100': [
    {
      name: '@city',
      'value|1-100': 150,
      'type|0-2': 1
    }
  ]
})

export default {
  fetchMonitorData() {
    return {
      tags
    }
  }
}

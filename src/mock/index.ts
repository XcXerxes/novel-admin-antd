import * as Mock from 'mockjs'
import * as FetchMock from 'fetch-mock'
import User from './User'
import Charts from './charts'
import Monitor from './monitor'
import Workplace from './workplace'


// auth
FetchMock.mock(/\/auth\/signin/, User.signin, {
  method: 'post'
})

// charts
FetchMock.mock(/\/dashboard\/fake_chart_data/, Charts.fakeChartData, {
  method: 'get'
})

// monitor
FetchMock.mock(/\/dashboard\/monitor\/tags/, Monitor.fetchMonitorData, {
  method: 'get'
})

// Wrokplace
FetchMock.mock(/\/dashboard\/workplace\/activities/, Workplace.fetchWorkplaceData, {
  method: 'get'
})

export default Mock

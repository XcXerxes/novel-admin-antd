import { users } from './user'
import { fakeCharts } from './charts'
import { fetchMonitor } from './monitor'
import { fetchWorkplace } from './workplace'
import { combineReducers } from 'redux'

export default combineReducers({
  users,
  fakeCharts,
  fetchMonitor,
  fetchWorkplace
})


import * as types from '../actionTypes'
import { fetchMonitorData } from '../../api/Dashboard'

export const fetchMonitor = () => async (dispatch:any) => {
  try {
    dispatch({
      type: types.MONITOR_REQUEST,
      loading: true,
      monitor: {}
    })
    setTimeout(async () => {
      const monitor = await fetchMonitorData()
      return dispatch({
        type: types.MONITOR_SUCCESS,
        loading: false,
        monitor
      })
    }, 1000)
  } catch (error) {
    throw error
  }
}

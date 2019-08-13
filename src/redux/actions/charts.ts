import * as types from '../actionTypes'
import { fakeChartData } from '../../api/Dashboard'

export const fakeChart = () => async (dispatch:any) => {
  try {
    dispatch({
      type: types.CHARTS_REQUEST,
      loading: true,
      charts: {}
    })
    setTimeout(async () => {
      const charts = await fakeChartData()
      return dispatch({
        type: types.CHARTS_SUCCESS,
        loading: false,
        charts
      })
    }, 1000)
  } catch (error) {
    throw error
  }
}

// export const requestFakeChart
import * as types from '../actionTypes'
import { fetchWorkplaceData } from '../../api/Dashboard'

export const fetchWorkplace = () => async (dispatch:any) => {
  try {
    dispatch({
      type: types.WORKPLACE_REQUEST,
      loading: true,
      workplace: {}
    })
    setTimeout(async () => {
      const workplace = await fetchWorkplaceData()
      return dispatch({
        type: types.WORKPLACE_SUCCESS,
        loading: false,
        workplace
      })
    }, 1000)
  } catch (error) {
    throw error
  }
}

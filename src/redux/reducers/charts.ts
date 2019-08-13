
export const fakeCharts = (state:any={charts: {}, loading: true}, action:any) => {
  switch (action.type) {
    case 'CHARTS_REQUEST':
      return {
        ...state,
        loading: true,
        charts: action.charts
      }
    case 'CHARTS_SUCCESS':
      return {
        ...state,
        loading: false,
        charts: action.charts
      }
    default:
      return state
  }
}

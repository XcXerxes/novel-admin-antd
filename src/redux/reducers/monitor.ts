
export const fetchMonitor = (state:any={monitor: {}, loading: true}, action:any) => {
  switch (action.type) {
    case 'MONITOR_REQUEST':
      return {
        ...state,
        loading: true,
        monitor: action.monitor
      }
    case 'MONITOR_SUCCESS':
      return {
        ...state,
        loading: false,
        monitor: action.monitor
      }
    default:
      return state
  }
}

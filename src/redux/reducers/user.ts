export const users = (state:any={userInfo: {}}, action:any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userInfo: action.userInfo
      }
    default:
      return state
  }
}

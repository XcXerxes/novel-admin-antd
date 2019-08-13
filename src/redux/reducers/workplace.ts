interface IActionTypes {
  type: string;
  loading: boolean;
  workplace?: any;
}
export const fetchWorkplace = (state:any={workplace: {}, loading: true}, action:IActionTypes) => {
  switch(action.type) {
    case 'WORKPLACE_REQUEST':
      return {
        ...state,
        workplace: action.workplace,
        loading: true
      }
    case 'WORKPLACE_SUCCESS':
      return {
        ...state,
        workplace: action.workplace,
        loading: false
      }
    default:
      return state
  }
}

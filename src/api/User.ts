import Request from './Request'

export interface ISigninParams {
  username: string;
  password: string;
}

export function signin (data:ISigninParams) {
  return Request('/auth/signin', {
    body: JSON.stringify(data)
  })
}

const userList = {
  admin: {
    token: 'admin',
    username: 'admin'
  },
  agent: {
    token: 'agent',
    username: 'agent'
  }
}

export default {
  signin(url:string, data:any) {
    const { username } = JSON.parse(data.body)
    return userList[username]
  }
}

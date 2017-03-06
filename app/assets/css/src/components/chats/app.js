import React from 'react'
import UserList from './userList'
import ChatsBox from './chatsBox'

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <UserList />
          <ChatsBox />
        </div>
      )
  }
}

export default App

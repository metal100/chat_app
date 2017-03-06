import React from 'react'
import Header from './header'
import UserList from './userList'
import ChatsBox from './chatsBox'

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <Header />
          <UserList />
          <ChatsBox />
        </div>
      )
  }
}

export default App

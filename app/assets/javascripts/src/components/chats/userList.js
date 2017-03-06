import React from 'react'
// import _ from 'lodash'
import classNames from 'classnames'
import Utils from '../../utils'
import ChatsStore from '../../stores/chats'
import UserStore from '../../stores/user'
import ChatsAction from '../../actions/chats'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    // const allChats = ChatsStore.getAllChats()

    const messageList = []
    // _.each(allChats, (message) => {
      // const chatsLength = message.chats.length()
    //   messageList.push({
    //     lastMessage: message.chats[chatsLength - 1],
    //     lastAccess: message.lastAccess,
    //     user: message.user,
    //   })
    // })
    return {
      openChatID: ChatsStore.getOpenChatUserID(),
      messageList: messageList,
    }
  }
  componentWillMount() {
    ChatsStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    ChatsStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(id) {
    ChatsAction.changeOpenChat(id)
  }
  render() {
    this.state.messageList.sort((a, b) => {
      if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
        return -1
      }
      if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
        return 1
      }
      return 0
    })

    const chats = this.state.messageList.map((message, index) => {
      const date = Utils.getNiceDate(message.lastMessage.timestamp)
//
      var statusIcon
      if (message.lastMessage.from !== message.user.id) {
        statusIcon = (
          <i className='fa fa-reply user-list__item__icon' />
        )
      }
      if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
        statusIcon = (
          <i className='fa fa-circle user-list__item__icon' />
        )
      }

      var isNewMessage = false
      if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
        isNewMessage = message.lastMessage.from !== UserStore.user.id
      }

      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--new': isNewMessage,
        'user-list__item--active': this.state.openChatID === message.user.id,
      })

      return (
        <li
          onClick={ this.changeOpenChat.bind(this, message.user.id) }
          className={ itemClasses }
          key={ message.user.id }
        >
          <div className='user-list__item__picture'>
            <img src={ message.user.profilePicture } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { message.user.name }
              <abbr className='user-list__item__timestamp'>
                { date }
              </abbr>
            </h4>
            <span className='user-list__item__message'>
              { statusIcon } { message.lastMessage.contents }
            </span>
          </div>
        </li>
      )
    }, this)
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { chats }
        </ul>
      </div>
    )
  }
}

export default UserList

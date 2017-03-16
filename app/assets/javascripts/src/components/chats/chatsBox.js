import React from 'react'
import classNames from 'classNames'
import ChatsStore from '../../stores/chats'
import ReplyBox from '../../components/chats/replyBox'
// import UserStore from '../../stores/user'
// import Utils from '../../utils'

class ChatsBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.state = {chats: ChatsStore.getAllChats()}
    this.onChangeHandler = this.onStoreChange.bind(this)
  }
  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      chats: ChatsStore.getAllChats(),
    }
  }

  componentWillMount() {
    ChatsStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    ChatsStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    // const chatsLength = this.state.chats.length
    // const currentUserID = UserStore.user.id
    const chats = this.state.chats.map((chat, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        // 'message-box__item--from-current': chats.from === currentUserID,
        'clear': true,
      })

      return (
          <li key={ chat.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              { chat.content }
            </div>
          </li>
        )
    })

    // const lastMessage = this.state.chats[chatsLength - 1]

    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     chats.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { chats }
          </ul>
          <ReplyBox />,
        </div>
      )
  }
}

export default ChatsBox

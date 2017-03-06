import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from '../stores/user'
import {ActionTypes} from '../constants/app'

// const stores = {
//   2: {
//     user: {
//       profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
//       id: 2,
//       name: 'Ryan Clark',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424469794050,
//       currentUser: 1424469794080,
//     },
//     stores: [
//       {
//         contents: 'Hey!',
//         from: 2,
//         timestamp: 1424469793023,
//       },
//       {
//         contents: 'Hey, what\'s up?',
//         from: 1,
//         timestamp: 1424469794000,
//       },
//     ],
//   },
//   3: {
//     user: {
//       read: true,
//       profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
//       name: 'Jilles Soeters',
//       id: 3,
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424352522000,
//       currentUser: 1424352522080,
//     },
//     stores: [
//       {
//         contents: 'Want a game of ping pong?',
//         from: 3,
//         timestamp: 1424352522000,
//       },
//     ],
//   },
//   4: {
//     user: {
//       name: 'Todd Motto',
//       id: 4,
//       profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424423579000,
//       currentUser: 1424423574000,
//     },
//     stores: [
//       {
//         contents: 'Please follow me on twitter I\'ll pay you',
//         timestamp: 1424423579000,
//         from: 4,
//       },
//     ],
//   },
// }

// var openChatID = parseInt(Object.keys(stores)[0], 10)

class ChatStore extends BaseStore {

  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getOpenChatUserID() {
    if (!this.get('OpenChatUserID')) this.setOpenChatUserID(1)
    return this.get('OpenChatUserID')
  }

  setOpenChatUserID(OpenChatUserID) {
    this.set('OpenChatUserID', OpenChatUserID)
  }

  getAllChats() {
    if (!this.get('AllChats')) this.setAllChats([])
    return this.get('AllChats')
  }

  setAllChats(AllChats) {
    this.set('AllChats', AllChats)
  }
}

const ChatsStore = new ChatStore()

ChatsStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case 'updateOpenChatID':
      // openChatID = payload.action.userID
      // chats[openChatID].lastAccess.currentUser = +new Date()
      ChatsStore.emitChange()
      break

    case ActionTypes.GET_CHATS:
      const json = action.json
      ChatsStore.setAllChats(json)
      ChatsStore.emitChange()
      break

    case 'sendChats':
      // const userID = action.userID
      // chats[userID].chats.push({
      //   contents: action.message,
      //   timestamp: action.timestamp,
      //   from: UserStore.user.id,
      // })
      // chats[userID].lastAccess.currentUser = +new Date()
      // ChatsStore.emitChange()
      break
  }
  return true
})

window.ChatsStore = ChatsStore
export default ChatsStore

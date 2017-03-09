import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UserStore extends BaseStore {
  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }

 setUsers(array) {
   this.set('users', array)
 }
}

const UsersStore = new UserStore()

UsersStore.dispatcherToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.LOAD_USERS:
      UsersStore.setUsers(action.json)
      UsersStore.emitChange()
      break

    case ActionTypes.LOAD_SEARCH_USERS:
      UsersStore.setUsers(action.json)
      UsersStore.emitChange()
      break
  }
  return true
})

export default UsersStore

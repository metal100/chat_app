import _ from 'lodash'
import React from 'react'
import UserStore from '../../stores/user'
import Utils from '../../lib/utils'

export default class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      users: UserStore.getUsers(),
    }
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  onSubmitHandler(to_user_id) {
    Utils.post('/friendships', {to_user_id})
  }

  render() {
    const searchUsers = this.state.users

    return (
        <ul className='search_user_list'>
          {
            _.map(searchUsers, (user) => {
              return (
                <li key={user.id} onClick={this.onSubmitHandler.bind(this, user.id)}>
                  {user.name}
                </li>
              )
            })
          }
        </ul>
        // return(
        //   <li
        //   onClick={ this.changeOpenChat.bind(this,users.id) }
        //   classname={ itemClasses }
        //   key={ user.id }
        //   >
        // )
    )
  }
}

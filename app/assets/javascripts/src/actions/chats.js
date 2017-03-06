import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {

  getChats() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/chats')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_CHATS,
            json: json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  postChats(contents) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.Chats}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({contents: contents})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.POST_CHATS,
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}

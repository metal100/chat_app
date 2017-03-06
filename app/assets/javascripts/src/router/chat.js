import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import ChatsAction from '../actions/chats'
import App from '../components/chats/app'

export default class ChatRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadChats)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }

  loadChats(ctx, next) {
    ChatsAction.getChats()
    next()
  }
}

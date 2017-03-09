import 'babel-polyfill'
import $ from './vendor/jquery'
import page from 'page'
import ChatRouter from './router/chat'
import UserRouter from './router/user'

$(() => {
  const chatRouter = new ChatRouter()
  chatRouter.register()
  const userRouter = new UserRouter()
  userRouter.register()

  page({click: false})
})

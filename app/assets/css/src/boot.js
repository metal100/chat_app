import 'babel-polyfill'
import $ from './vendor/jquery'
import page from 'page'
import ChatRouter from './router/chat'

$(() => {
  const chatRouter = new ChatRouter()
  chatRouter.register()

  page({click: false})
})

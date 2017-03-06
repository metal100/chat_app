import keyMirror from 'keymirror'

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  Chats: APIRoot + '/chats',
}

export const ActionTypes = keyMirror({
  GET_CHATS: null, POST_CHATS: null,
})

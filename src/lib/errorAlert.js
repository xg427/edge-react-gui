// @flow

import type { Action, Store } from '../modules/ReduxTypes.js'

export default (store: Store) => (next: Function) => (action: Action) => {
  let out
  try {
    out = next(action)
  } catch (error) {
    console.log(error)
    store.dispatch({ type: 'ERROR_ALERT/DISPLAY_ERROR_ALERT', data: { message: error.message } })
  }

  if (out && out.then && typeof out.then === 'function') {
    out.catch(error => {
      console.log(error)
      store.dispatch({ type: 'ERROR_ALERT/DISPLAY_ERROR_ALERT', data: { message: error.message } })
    })
  }

  return out
}

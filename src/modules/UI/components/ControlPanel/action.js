// @flow

import * as CONTEXT_API from '../../../Core/Context/api'
import * as CORE_SELECTORS from '../../../Core/selectors'
import type { Dispatch, GetState } from '../../../ReduxTypes'

type OpenSelectUserAction = {
  type: 'CONTROL_PANEL/OPEN_SELECT_USER'
}

type CloseSelectUserAction = {
  type: 'CONTROL_PANEL/CLOSE_SELECT_USER'
}

export type ControlPanelAction = OpenSelectUserAction | CloseSelectUserAction

export const deleteLocalAccount = (username: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const context = CORE_SELECTORS.getContext(state)
  dispatch({ type: 'CONTEXT/DELETE_LOCAL_ACCOUNT_REQUEST', data: { username } })

  return CONTEXT_API.deleteLocalAccount(context, username)
    .then(() => CONTEXT_API.listUsernames(context))
    .then(usernames => {
      dispatch({ type: 'CONTEXT/DELETE_LOCAL_ACCOUNT_SUCCESS', data: { usernames } })
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: 'CONTEXT/DELETE_LOCAL_ACCOUNT_ERROR', data: { username } })
    })
}

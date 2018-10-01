// @flow

import { deleteLocalAccountError, deleteLocalAccountRequest, deleteLocalAccountSuccess } from '../../../Core/Context/action'
import { deleteLocalAccount as contextDeleteLocalAccount, getUsernames } from '../../../Core/Context/api'
import * as CORE_SELECTORS from '../../../Core/selectors'
import type { Dispatch, GetState } from '../../../ReduxTypes'

export const openSelectUser = () => ({
  type: 'OPEN_SELECT_USER'
})

export const closeSelectUser = () => ({
  type: 'CLOSE_SELECT_USER'
})

export const selectUsersList = (name: string) => ({
  type: 'SELECT_USERS_SIDE_MENU',
  name
})

export const removeUsersList = (name: string) => ({
  type: 'REMOVE_USERS_SIDE_MENU',
  name
})

export const deleteLocalAccount = (username: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const context = CORE_SELECTORS.getContext(state)
  dispatch(deleteLocalAccountRequest(username))

  return contextDeleteLocalAccount(context, username)
    .then(() => getUsernames(context))
    .then(allUsernames => dispatch(deleteLocalAccountSuccess(allUsernames)))
    .catch(e => {
      console.log(e)
      dispatch(deleteLocalAccountError(username))
    })
}

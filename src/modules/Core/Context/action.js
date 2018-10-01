// @flow

import { type DiskletFolder, type EdgeContext, type EdgeUserInfo } from 'edge-core-js'

import { displayErrorAlert } from '../../UI/components/ErrorAlert/actions.js'
import { getUsernames } from './api.js'

export type AddContextAction = {
  type: 'CORE/CONTEXT/ADD_CONTEXT',
  data: { context: EdgeContext, folder: DiskletFolder }
}

export type AddUsernamesAction = {
  type: 'CORE/CONTEXT/ADD_USERNAMES',
  data: { usernames: Array<string> }
}

export type DeleteLocalAccountRequestAction = {
  type: 'CORE/CONTEXT/DELETE_LOCAL_ACCOUNT_REQUEST',
  data: { username: string }
}

export type DeleteLocalAccountSuccessAction = {
  type: 'CORE/CONTEXT/DELETE_LOCAL_ACCOUNT_SUCCESS',
  data: { usernames: Array<string> }
}

export type DeleteLocalAccountErrorAction = {
  type: 'CORE/CONTEXT/DELETE_LOCAL_ACCOUNT_ERROR',
  data: { username: string }
}

export type CoreContextAction =
  | AddContextAction
  | AddUsernamesAction
  | DeleteLocalAccountRequestAction
  | DeleteLocalAccountSuccessAction
  | DeleteLocalAccountErrorAction

export const addUsernames = (usernames: Array<string>): AddUsernamesAction => ({
  type: 'CORE/CONTEXT/ADD_USERNAMES',
  data: { usernames }
})

export const deleteLocalAccountRequest = (username: string): DeleteLocalAccountRequestAction => ({
  type: 'CORE/CONTEXT/DELETE_LOCAL_ACCOUNT_REQUEST',
  data: { username }
})

export const deleteLocalAccountSuccess = (allUsernames: Array<string>): DeleteLocalAccountSuccessAction => ({
  type: 'CORE/CONTEXT/DELETE_LOCAL_ACCOUNT_SUCCESS',
  data: { usernames: allUsernames }
})

export const deleteLocalAccountError = (username: string): DeleteLocalAccountErrorAction => ({
  type: 'CORE/CONTEXT/DELETE_LOCAL_ACCOUNT_ERROR',
  data: { username }
})

export const addContext = (context: EdgeContext, folder: DiskletFolder) => (dispatch: Dispatch) => {
  context.on('error', (error: Error) => dispatch(displayErrorAlert(error.message)))

  context.watch('localUsers', (localUsers: Array<EdgeUserInfo>) => {
    const usernames = getUsernames(context)
    dispatch({
      type: 'CORE/CONTEXT/ADD_USERNAMES',
      data: { usernames }
    })
  })

  const usernames = getUsernames(context)
  dispatch({
    type: 'CORE/CONTEXT/ADD_USERNAMES',
    data: { usernames }
  })

  dispatch({
    type: 'CORE/CONTEXT/ADD_CONTEXT',
    data: { context, folder }
  })
}

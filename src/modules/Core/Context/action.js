// @flow

import type { DiskletFolder, EdgeContext } from 'edge-core-js'

type AddContextAction = {
  type: 'CONTEXT/ADD_CONTEXT',
  data: { context: EdgeContext, folder: DiskletFolder }
}

type AddUsernamesAction = {
  type: 'CONTEXT/ADD_USERNAMES',
  data: { usernames: Array<string> }
}

type DeleteLocalAccountRequestAction = {
  type: 'CONTEXT/DELETE_LOCAL_ACCOUNT_REQUEST',
  data: { username: string }
}

type DeleteLocalAccountSuccessAction = {
  type: 'CONTEXT/DELETE_LOCAL_ACCOUNT_SUCCESS',
  data: { usernames: Array<string> }
}

type DeleteLocalAccountErrorAction = {
  type: 'CONTEXT/DELETE_LOCAL_ACCOUNT_ERROR',
  data: { username: string }
}

export type ContextAction =
  | AddContextAction
  | AddUsernamesAction
  | DeleteLocalAccountRequestAction
  | DeleteLocalAccountErrorAction
  | DeleteLocalAccountSuccessAction

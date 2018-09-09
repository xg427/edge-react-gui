// @flow

import type { DiskletFolder, EdgeContext } from 'edge-core-js'

import type { Action } from '../../ReduxTypes'

const initialState = {
  context: {},
  usernames: [],
  nextUsername: ''
}
export type State = {
  context: EdgeContext | {},
  usernames: Array<string>,
  nextUsername: string
}
export const context = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'CONTEXT/ADD_CONTEXT': {
      if (!action.data) throw new Error('Invalid Action')
      const context: EdgeContext = action.data.context
      const folder: DiskletFolder = action.data.folder
      return {
        ...state,
        context,
        folder
      }
    }

    case 'CONTEXT/ADD_USERNAMES': {
      if (!action.data) throw new Error('Invalid Action')
      return {
        ...state,
        usernames: action.data.usernames
      }
    }

    case 'CONTEXT/DELETE_LOCAL_ACCOUNT_SUCCESS': {
      if (!action.data) throw new Error('Invalid Action')
      return {
        ...state,
        usernames: action.data.usernames
      }
    }
    case 'DEEP_LINK_RECEIVED':
    case 'LOGOUT': {
      if (!action.data) throw new Error('Invalid Action')
      return {
        ...state,
        nextUsername: action.data.username || ''
      }
    }

    default:
      return state
  }
}

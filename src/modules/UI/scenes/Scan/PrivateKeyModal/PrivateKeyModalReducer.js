// @flow

import { combineReducers } from 'redux'

import type { Action } from '../../../../ReduxTypes.js'
import { primaryModal } from './PrimaryModal/PrimaryModalReducer.js'
import { secondaryModal } from './SecondaryModal/SecondaryModalReducer.js'
import { THINKING_STARTED, THINKING_STOPPED } from './PrivateKeyModalActions.js'

const initialIsThinkingState = false
type IsThinkingState = boolean
export const isThinking = (state: IsThinkingState = initialIsThinkingState, action: Action) => {
  switch (action.type) {
    case THINKING_STARTED: {
      return true
    }
    case THINKING_STOPPED: {
      return false
    }
    default:
      return state
  }
}

const initialErrorState = null
type ErrorState = Error | null
export const error = (state: ErrorState = initialErrorState, action: Action) => {
  switch (action.type) {
    // case IMPORT_PRIVATE_KEY_FAILED: {
    //   // $FlowFixMe
    //   return action.data.error
    // }
    default:
      return state
  }
}

export const privateKeyModal = combineReducers({
  primaryModal,
  secondaryModal,
  error,
  isThinking
})

export default privateKeyModal

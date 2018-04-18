// @flow

import { combineReducers } from 'redux'

import type { Action } from '../../../../ReduxTypes.js'
import { CAMERA_TORCH_TOGGLED, SCENE_ENTERED, SCENE_EXITED } from '../scanActions.js'

export type IsEnabledState = boolean
export const initialIsEnabledState = false
export const isEnabled = (state: IsEnabledState = initialIsEnabledState, action: Action) => {
  switch (action.type) {
    case SCENE_ENTERED:
      return true
    case SCENE_EXITED:
      return false
    default:
      return state
  }
}

export type TorchState = {
  isEnabled: boolean
}
export const initialTorchState = {
  isEnabled: false
}
export const torch = (state: TorchState = initialTorchState, action: Action) => {
  const { type } = action
  switch (type) {
    case CAMERA_TORCH_TOGGLED: {
      return {
        ...state,
        isEnabled: !state.isEnabled
      }
    }
    default:
      return state
  }
}

export const camera = combineReducers({
  isEnabled,
  torch
})

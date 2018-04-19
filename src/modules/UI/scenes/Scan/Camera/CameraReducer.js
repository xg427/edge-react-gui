// @flow

import { combineReducers } from 'redux'

import type { Action } from '../../../../ReduxTypes.js'
import { SCAN_ENABLED, SCAN_DISABLED, SCAN_TOGGLED, TORCH_ENABLED, TORCH_DISABLED, TORCH_TOGGLED } from './CameraActions.js'

export type ScanState = {
  isEnabled: boolean
}
export const initialScanState = {
  isEnabled: false
}
export const scan = (state: ScanState = initialScanState, action: Action) => {
  const { type } = action
  switch (type) {
    case SCAN_ENABLED: {
      return {
        ...state,
        isEnabled: true
      }
    }
    case SCAN_DISABLED: {
      return {
        ...state,
        isEnabled: false
      }
    }
    case SCAN_TOGGLED: {
      return {
        ...state,
        isEnabled: !state.isEnabled
      }
    }
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
    case TORCH_ENABLED: {
      return {
        ...state,
        isEnabled: true
      }
    }
    case TORCH_DISABLED: {
      return {
        ...state,
        isEnabled: false
      }
    }
    case TORCH_TOGGLED: {
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
  scan,
  torch
})

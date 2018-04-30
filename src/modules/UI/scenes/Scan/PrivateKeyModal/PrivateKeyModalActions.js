// @flow

import type { Dispatch } from '../../../../ReduxTypes.js'
import { activated as primaryModalActivated, deactivated as primaryModalDeactivated } from './PrimaryModal/PrimaryModalActions.js'
import { deactivated as secondaryModalDeactivated } from './SecondaryModal/SecondaryModalActions.js'

export const PREFIX = 'PRIVATE_KEY_MODAL/'

export const activated = () => (dispatch: Dispatch) => {
  dispatch(primaryModalActivated())
}

export const deactivated = () => (dispatch: Dispatch) => {
  dispatch(primaryModalDeactivated())
  dispatch(secondaryModalDeactivated())
}

export const sweepPrivateKeyStarted = () => (dispatch: Dispatch) => {}
export const sweepPrivateKeySucceeded = () => (dispatch: Dispatch) => {}
export const sweepPrivateKeyFailed = () => (dispatch: Dispatch) => {}

export const SWEEP_PRIVATE_KEY_START = PREFIX + 'SWEEP_PRIVATE_KEY_START'
export const sweepPrivateKeyStart = () => ({
  type: SWEEP_PRIVATE_KEY_START
})

export const SWEEP_PRIVATE_KEY_SUCCESS = PREFIX + 'SWEEP_PRIVATE_KEY_SUCCESS'
export const sweepPrivateKeySuccess = () => ({
  type: SWEEP_PRIVATE_KEY_SUCCESS,
  data: {}
})

export const SWEEP_PRIVATE_KEY_FAIL = PREFIX + 'SWEEP_PRIVATE_KEY_FAIL'
export const sweepPrivateKeyFail = (error: Error) => ({
  type: SWEEP_PRIVATE_KEY_FAIL,
  data: { error }
})

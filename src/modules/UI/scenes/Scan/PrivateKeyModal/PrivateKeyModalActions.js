// @flow

import type { EdgeCurrencyWallet, EdgeSpendInfo } from 'edge-login'
import { Actions } from 'react-native-router-flux'

import type { Dispatch, GetState } from '../../../../ReduxTypes.js'

export const PREFIX = 'PRIVATE_KEY_MODAL/'

export const ACTIVATED = PREFIX + 'ACTIVATED'
export const activated = () => ({
  type: ACTIVATED
})

export const DEACTIVATED = PREFIX + 'DEACTIVATED'
export const deactivated = () => ({
  type: DEACTIVATED
})

export const TOGGLED = PREFIX + 'TOGGLED'
export const toggled = () => ({
  type: TOGGLED
})

export const RESET = PREFIX + 'RESET'
export const reset = () => ({
  type: RESET
})

export const DISMISS_MODAL = PREFIX + 'DISMISS_MODAL'
export const dismissModal = () => ({
  type: DISMISS_MODAL
})

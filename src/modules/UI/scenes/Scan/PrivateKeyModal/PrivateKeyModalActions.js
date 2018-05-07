// @flow

import type { EdgeSpendInfo } from 'edge-core-js'
import { Actions } from 'react-native-router-flux'

import { updateParsedURI } from '../../SendConfirmation/action.js'

import type { Dispatch, GetState } from '../../../../ReduxTypes.js'
import { activated as primaryModalActivated, deactivated as primaryModalDeactivated } from './PrimaryModal/PrimaryModalActions.js'
import { activated as secondaryModalActivated, deactivated as secondaryModalDeactivated } from './SecondaryModal/SecondaryModalActions.js'

export const PREFIX = 'PRIVATE_KEY_MODAL/'

export const activated = () => (dispatch: Dispatch) => {
  setTimeout(() => dispatch(primaryModalActivated()), 500)
}

export const deactivated = () => (dispatch: Dispatch) => {
  dispatch(primaryModalDeactivated())
  setTimeout(() => dispatch(secondaryModalDeactivated()), 500)
}

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

// PRIVATE KEY
export const onPrivateKeyAccept = () => (dispatch: Dispatch, getState: GetState) => {
  dispatch(primaryModalDeactivated())
  setTimeout(() => dispatch(secondaryModalActivated()), 500)
  // dispatch(privateKeyModalDeactivated())
  // dispatch(enableScan())

  const state = getState()
  const parsedUri = state.ui.scenes.scan.parsedUri
  if (!parsedUri) return
  const selectedWalletId = state.ui.wallets.selectedWalletId
  const edgeWallet = state.core.wallets.byId[selectedWalletId]

  const spendInfo: EdgeSpendInfo = {
    privateKeys: parsedUri.privateKeys,
    spendTargets: []
  }

  dispatch(sweepPrivateKeyStart())

  edgeWallet.sweepPrivateKeys(spendInfo).then(
    edgeTransaction => {
      dispatch(sweepPrivateKeySuccess())
      dispatch(updateParsedURI(parsedUri))
      Actions.sendConfirmation('fromScan')
    },
    error => {
      dispatch(sweepPrivateKeyFail(error))
    }
  )
}

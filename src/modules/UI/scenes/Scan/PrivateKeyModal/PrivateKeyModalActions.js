// @flow

import type { EdgeSpendInfo, EdgeTransaction } from 'edge-core-js'

import type { Dispatch, GetState } from '../../../../ReduxTypes.js'
import { type PrimaryModalAction } from './PrimaryModal/PrimaryModalActions.js'
import { type SecondaryModalAction } from './SecondaryModal/SecondaryModalActions.js'

type SweepPrivateKeyStartAction = {
  type: 'PRIVATE_KEY_MODAL/SWEEP_PRIVATE_KEY_START'
}

type SweepPrivateKeySuccessAction = {
  type: 'PRIVATE_KEY_MODAL/SWEEP_PRIVATE_KEY_SUCCESS'
}

type SweepPrivateKeyFailAction = {
  type: 'PRIVATE_KEY_MODAL/SWEEP_PRIVATE_KEY_FAIL',
  data: { error: Error }
}

type SweepPrivateKeyResetAction = {
  type: 'PRIVATE_KEY_MODAL/SWEEP_PRIVATE_KEY_RESET'
}

export type PrivateKeyModalAction =
  | SweepPrivateKeyStartAction
  | SweepPrivateKeySuccessAction
  | SweepPrivateKeyFailAction
  | SweepPrivateKeyResetAction
  | PrimaryModalAction
  | SecondaryModalAction

export const activated = () => (dispatch: Dispatch) => {
  setTimeout(() => dispatch({ type: 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_ACTIVATED' }), 500)
}

export const deactivated = () => (dispatch: Dispatch) => {
  dispatch({ type: 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_DEACTIVATED' })
  setTimeout(() => dispatch({ type: 'PRIVATE_KEY_MODAL/SECONDARY_MODAL_DEACTIVATED' }), 500)
}

export const onPrivateKeyAccept = () => (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_DEACTIVATED' })
  setTimeout(() => {
    dispatch({ type: 'PRIVATE_KEY_MODAL/SWEEP_PRIVATE_KEY_START' })
    dispatch({ type: 'PRIVATE_KEY_MODAL/SECONDARY_MODAL_ACTIVATED' })

    const state = getState()
    const parsedUri = state.ui.scenes.scan.parsedUri
    if (!parsedUri) return
    const selectedWalletId = state.ui.wallets.selectedWalletId
    const edgeWallet = state.core.wallets.byId[selectedWalletId]

    const spendInfo: EdgeSpendInfo = {
      privateKeys: parsedUri.privateKeys,
      spendTargets: []
    }

    edgeWallet.sweepPrivateKeys(spendInfo).then(
      (unsignedTx: EdgeTransaction) => {
        edgeWallet
          .signTx(unsignedTx)
          .then(signedTx => edgeWallet.broadcastTx(signedTx))
          .then(() => dispatch({ type: 'PRIVATE_KEY_MODAL/SWEEP_PRIVATE_KEY_SUCCESS' }))
      },
      (error: Error) => {
        dispatch({ type: 'PRIVATE_KEY_MODAL/SWEEP_PRIVATE_KEY_FAIL', data: { error } })
      }
    )
  }, 1000)
}

export const onPrivateKeyReject = () => (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_DEACTIVATED' })
}

// @flow

import type { EdgeParsedUri } from 'edge-core-js'
import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { loginWithEdge } from '../../../../actions/EdgeLoginActions.js'
import { ADD_TOKEN, EDGE_LOGIN, SEND_CONFIRMATION } from '../../../../constants/indexConstants.js'
import s from '../../../../locales/strings.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'
import type { Dispatch, GetState } from '../../../ReduxTypes.js'
import { denominationToDecimalPlaces, isEdgeLogin, noOp } from '../../../utils.js'
import { paymentProtocolUriReceived, updateParsedURI } from '../SendConfirmation/action.js'
import { activated as privateKeyModalActivated } from './PrivateKeyModal/PrivateKeyModalActions.js'

type ToggleEnableTorchAction = {
  type: 'SCAN/TOGGLE_ENABLE_TORCH'
}

type ToggleAddressModalAction = {
  type: 'SCAN/TOGGLE_ADDRESS_MODAL_VISIBILITY'
}

type EnableScanAction = {
  type: 'SCAN/ENABLE_SCAN'
}

type DisableScanAction = {
  type: 'SCAN/DISABLE_SCAN'
}

type ParseUriSucceededAction = {
  type: 'SCAN/PARSE_URI_SUCCEEDED',
  data: { parsedUri: EdgeParsedUri }
}

type ParseUriFailedAction = {
  type: 'SCAN/PARSE_URI_FAILED',
  data: { error: Error }
}

type ParseUriResetAction = {
  type: 'SCAN/PARSE_URI_RESET'
}

export type ScanAction =
  | ToggleEnableTorchAction
  | ToggleAddressModalAction
  | EnableScanAction
  | DisableScanAction
  | ParseUriSucceededAction
  | ParseUriFailedAction
  | ParseUriResetAction

export const parseUri = (data: string) => (dispatch: Dispatch, getState: GetState) => {
  if (!data) return
  const state = getState()
  const selectedWalletId = state.ui.wallets.selectedWalletId
  const edgeWallet = state.core.wallets.byId[selectedWalletId]
  const guiWallet = state.ui.wallets.byId[selectedWalletId]
  if (isEdgeLogin(data)) {
    // EDGE LOGIN
    dispatch(loginWithEdge(data))
    Actions[EDGE_LOGIN]()
    return
  }

  WALLET_API.parseUri(edgeWallet, data).then(
    (parsedUri: EdgeParsedUri) => {
      dispatch({ type: 'SCAN/PARSE_URI_SUCCEEDED', data: { uri: parsedUri } })

      if (parsedUri.token) {
        // TOKEN URI
        const { contractAddress, currencyName, multiplier } = parsedUri.token
        const currencyCode = parsedUri.token.currencyCode.toUpperCase()
        let decimalPlaces = 18
        if (parsedUri.token && parsedUri.token.multiplier) {
          decimalPlaces = denominationToDecimalPlaces(parsedUri.token.multiplier)
        }
        const parameters = {
          contractAddress,
          currencyCode,
          currencyName,
          multiplier,
          decimalPlaces,
          walletId: selectedWalletId,
          wallet: guiWallet,
          onAddToken: noOp
        }
        return Actions[ADD_TOKEN](parameters)
      }

      if (isLegacyAddressUri(parsedUri)) {
        // LEGACY ADDRESS URI
        return setTimeout(() => dispatch({ type: 'LEGACY_ADDRESS_MODAL/ACTIVATED' }), 500)
      }

      if (isPrivateKeyUri(parsedUri)) {
        // PRIVATE KEY URI
        return setTimeout(() => dispatch(privateKeyModalActivated()), 500)
      }

      if (isPaymentProtocolUri(parsedUri)) {
        // BIP70 URI
        // $FlowFixMe
        return dispatch(paymentProtocolUriReceived(parsedUri))
      }

      // PUBLIC ADDRESS URI
      Actions[SEND_CONFIRMATION]('fromScan')
      dispatch(updateParsedURI(parsedUri))
    },
    () => {
      // INVALID URI
      dispatch({ type: 'SCAN/DISABLE_SCAN' })
      setTimeout(
        () =>
          Alert.alert(s.strings.scan_invalid_address_error_title, s.strings.scan_invalid_address_error_description, [
            { text: s.strings.string_ok, onPress: () => dispatch({ type: 'SCAN/ENABLE_SCAN' }) }
          ]),
        500
      )
    }
  )
}

export const legacyAddressModalContinueButtonPressed = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  dispatch({ type: 'LEGACY_ADDRESS_MODAL/DEACTIVATED' })
  const parsedUri = state.ui.scenes.scan.parsedUri
  setImmediate(() => {
    if (!parsedUri) {
      dispatch({ type: 'SCAN/ENABLE_SCAN' })
      return
    }

    Actions[SEND_CONFIRMATION]('fromScan')
    dispatch(updateParsedURI(parsedUri))
  })
}

export const qrCodeScanned = (data: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const isScanEnabled = state.ui.scenes.scan.scanEnabled
  if (!isScanEnabled) return

  dispatch({ type: 'SCAN/DISABLE_SCAN' })
  dispatch(parseUri(data))
}

export const addressModalDoneButtonPressed = (data: string) => (dispatch: Dispatch, getState: GetState) => {
  dispatch(parseUri(data))
}

export const addressModalCancelButtonPressed = () => (dispatch: Dispatch, getState: GetState) => {
  // dispatch(addressModalDeactivated())
}

export const legacyAddressModalCancelButtonPressed = () => (dispatch: Dispatch) => {
  dispatch({ type: 'LEGACY_ADDRESS_MODAL/DEACTIVATED' })
  dispatch({ type: 'SCAN/ENABLE_SCAN' })
}

export const isTokenUri = (parsedUri: EdgeParsedUri): boolean => {
  return !!parsedUri.token
}

export const isLegacyAddressUri = (parsedUri: EdgeParsedUri): boolean => {
  return !!parsedUri.legacyAddress
}

export const isPrivateKeyUri = (parsedUri: EdgeParsedUri): boolean => {
  return !!parsedUri.privateKeys && parsedUri.privateKeys.length >= 1
}

export const isPaymentProtocolUri = (parsedUri: EdgeParsedUri): boolean => {
  return !!parsedUri.paymentProtocolURL && !parsedUri.publicAddress
}

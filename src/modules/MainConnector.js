// @flow

import { connect } from 'react-redux'

import * as actions from '../actions/indexActions'
import { requestPermission } from '../reducers/permissions/actions.js'
import makeContextCallbacks from './Core/Context/callbacks'
import Main from './Main.ui'
import type { Dispatch } from './ReduxTypes'
import { updateCurrentSceneKey } from './UI/scenes/action.js'
import { disableScan, enableScan } from './UI/scenes/Scan/action'
import { selectWallet } from './UI/Wallets/action.js'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestPermission: permission => {
    return dispatch(requestPermission(permission))
  },
  dispatchEnableScan: () => {
    return dispatch(enableScan())
  },
  dispatchDisableScan: () => {
    return dispatch(disableScan())
  },
  addCurrencyPlugin: plugin => {
    return dispatch({
      type: 'SETTINGS/ADD_CURRENCY_PLUGIN',
      data: { plugin }
    })
  },
  setKeyboardHeight: keyboardHeight => {
    return dispatch({ type: 'DIMENSIONS/SET_KEYBOARD_HEIGHT', data: keyboardHeight })
  },
  addContext: (context, folder) => {
    return dispatch({
      type: 'CONTEXT/ADD_CONTEXT',
      data: { context, folder }
    })
  },
  addUsernames: usernames => {
    return dispatch({
      type: 'CONTEXT/ADD_USERNAME',
      data: { usernames }
    })
  },
  updateCurrentSceneKey: sceneKey => {
    return dispatch(updateCurrentSceneKey(sceneKey))
  },
  // commented out since it was blowing up flow && doesnt seem to be called.. TODO remove
  /* setLocaleInfo: (localeInfo) => {
    return dispatch(setLocaleInfo(localeInfo))
  }, */
  urlReceived: backupKey => {
    return dispatch(actions.deepLinkLogout(backupKey))
  },
  contextCallbacks: makeContextCallbacks(dispatch),
  onSelectWallet: (walletId, currencyCode) => dispatch(selectWallet(walletId, currencyCode))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

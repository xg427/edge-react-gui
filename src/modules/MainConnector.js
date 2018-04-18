// @flow

import { connect } from 'react-redux'

import * as actions from '../actions/indexActions'
import { requestPermission } from '../reducers/permissions/actions.js'
import { addContext, addUsernames } from './Core/Context/action.js'
import makeContextCallbacks from './Core/Context/callbacks'
import Main from './Main.ui'
import type { Dispatch } from './ReduxTypes'
import { setKeyboardHeight } from './UI/dimensions/action'
import { cameraScanEnabled, cameraScanDisabled } from './UI/scenes/Scan/scanActions.js'
import { addCurrencyPlugin } from './UI/Settings/action'
import { updateCurrentSceneKey } from './UI/scenes/action.js'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestPermission: permission => {
    return dispatch(requestPermission(permission))
  },
  dispatchEnableScan: () => {
    return dispatch(cameraScanEnabled())
  },
  dispatchDisableScan: () => {
    return dispatch(cameraScanDisabled())
  },
  addCurrencyPlugin: plugin => {
    return dispatch(addCurrencyPlugin(plugin))
  },
  setKeyboardHeight: keyboardHeight => {
    return dispatch(setKeyboardHeight(keyboardHeight))
  },
  addContext: context => {
    return dispatch(addContext(context))
  },
  addUsernames: usernames => {
    return dispatch(addUsernames(usernames))
  },
  updateCurrentSceneKey: (sceneKey) => {
    return dispatch(updateCurrentSceneKey(sceneKey))
  },
  urlReceived: backupKey => {
    return dispatch(actions.deepLinkLogout(backupKey))
  },
  contextCallbacks: makeContextCallbacks(dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Main)

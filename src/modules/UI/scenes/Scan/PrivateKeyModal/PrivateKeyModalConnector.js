// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes.js'

import { PrivateKeyModal } from './PrivateKeyModal.ui.js'

export const mapStateToProps = (state: State) => ({
  error: state.ui.scenes.scan.privateKeyModal.error,
  isThinking: state.ui.scenes.scan.privateKeyModal.isThinking,
  parsedUri: state.ui.scenes.scan.parsedUri
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const PrivateKeyModalConnector = connect(mapStateToProps, mapDispatchToProps)(PrivateKeyModal)
export default PrivateKeyModalConnector

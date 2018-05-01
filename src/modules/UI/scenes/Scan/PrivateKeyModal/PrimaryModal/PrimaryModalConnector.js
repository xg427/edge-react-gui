// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../../ReduxTypes.js'

import { deactivated } from './PrimaryModalActions.js'
import { PrimaryModal } from './PrimaryModal.ui.js'

export const mapStateToProps = (state: State) => ({
  isVisible: state.ui.scenes.scan.privateKeyModal.primaryModal.isVisible,
  parsedUri: state.ui.scenes.scan.parsedUri
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onBackButtonPress: () => {
    dispatch(deactivated())
  },
  onBackdropPress: () => {
    dispatch(deactivated())
  }
})

export const PrimaryModalConnector = connect(mapStateToProps, mapDispatchToProps)(PrimaryModal)
export default PrimaryModalConnector

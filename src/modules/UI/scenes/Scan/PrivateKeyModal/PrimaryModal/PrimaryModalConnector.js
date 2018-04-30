// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../../ReduxTypes.js'

import { deactivated } from './PrimaryModalActions.js'
import { PrimaryModal } from './PrimaryModal.ui.js'

export const mapStateToProps = (state: State) => ({
  isVisible: state.ui.scenes.scan.privateKeyModal.primaryModal.isVisible,
  publicAddress: state.ui.scenes.scan.privateKeyModal.publicAddress
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onReject: () => {
    dispatch(deactivated())
  },
  onModalShow: () => {},
  onModalHide: () => {},
  backButtonPressed: () => {
    dispatch(deactivated())
  },
  backdropPressed: () => {
    dispatch(deactivated())
  }
})

export const PrimaryModalConnector = connect(mapStateToProps, mapDispatchToProps)(PrimaryModal)
export default PrimaryModalConnector

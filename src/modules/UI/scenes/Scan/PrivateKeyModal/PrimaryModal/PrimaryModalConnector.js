// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../../ReduxTypes.js'
import { PrimaryModal } from './PrimaryModal.ui.js'

export const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.scan.privateKeyModal.primaryModal.isActive
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onReject: () => {
    dispatch({ type: 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_DEACTIVATED' })
  },
  onBackButtonPress: () => {
    dispatch({ type: 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_DEACTIVATED' })
  },
  onBackdropPress: () => {
    dispatch({ type: 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_DEACTIVATED' })
  }
})

export const PrimaryModalConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryModal)
export default PrimaryModalConnector

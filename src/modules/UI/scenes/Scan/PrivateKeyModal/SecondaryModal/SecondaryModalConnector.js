// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../../ReduxTypes.js'
import { SecondaryModal } from './SecondaryModal.ui.js'

export const mapStateToProps = (state: State) => ({
  error: state.ui.scenes.scan.privateKeyModal.error,
  isSweeping: state.ui.scenes.scan.privateKeyModal.isSweeping,
  isActive: state.ui.scenes.scan.privateKeyModal.secondaryModal.isActive
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onBackButtonPress: () => {
    dispatch({ type: 'PRIVATE_KEY_MODAL/SECONDARY_MODAL_DEACTIVATED' })
  },
  onBackdropPress: () => {
    dispatch({ type: 'PRIVATE_KEY_MODAL/SECONDARY_MODAL_DEACTIVATED' })
  }
})

export const SecondaryModalConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryModal)
export default SecondaryModalConnector

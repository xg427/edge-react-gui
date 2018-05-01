// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../../ReduxTypes.js'

import { deactivated } from './SecondaryModalActions.js'
import { SecondaryModal } from './SecondaryModal.ui.js'

export const mapStateToProps = (state: State) => ({
  error: state.ui.scenes.scan.privateKeyModal.error,
  isSweeping: state.ui.scenes.scan.privateKeyModal.isSweeping,
  isVisible: state.ui.scenes.scan.privateKeyModal.secondaryModal.isVisible
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onBackButtonPress: () => {
    dispatch(deactivated())
  },
  onBackdropPress: () => {
    dispatch(deactivated())
  }
})

export const SecondaryModalConnector = connect(mapStateToProps, mapDispatchToProps)(SecondaryModal)
export default SecondaryModalConnector

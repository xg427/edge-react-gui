// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../../ReduxTypes.js'

import { deactivated } from './SecondaryModalActions.js'
import { SecondaryModal } from './SecondaryModal.ui.js'

export const mapStateToProps = (state: State) => ({
  error: state.ui.scenes.scan.privateKeyModal.error,
  isThinking: state.ui.scenes.scan.privateKeyModal.isThinking,
  parsedUri: state.ui.scenes.scan.privateKeyModal.parsedUri
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onModalShow: () => {},
  onModalHide: () => {},
  backButtonPressed: () => {
    dispatch(deactivated())
  },
  backdropPressed: () => {
    dispatch(deactivated())
  },
  expired: () => {
    dispatch(deactivated())
  }
})

export const SecondaryModalConnector = connect(mapStateToProps, mapDispatchToProps)(SecondaryModal)
export default SecondaryModalConnector

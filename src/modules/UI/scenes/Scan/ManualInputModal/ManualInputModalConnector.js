// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes'
import { deactivated } from './ManualInputModalActions.js'
import { ManualInputModal } from './ManualInputModal.ui.js'

const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.scan.manualInputModal.isActive,
  input: state.ui.scenes.scan.input,
  publicAddress: state.ui.scenes.scan.uri ? state.ui.scenes.scan.uri.publicAddress : null
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  backdropPressed: () => {
    dispatch(deactivated())
  },
  backButtonPressed: () => {
    dispatch(deactivated())
  }
})

export const ManualInputModalConnector = connect(mapStateToProps, mapDispatchToProps)(ManualInputModal)
export default ManualInputModalConnector

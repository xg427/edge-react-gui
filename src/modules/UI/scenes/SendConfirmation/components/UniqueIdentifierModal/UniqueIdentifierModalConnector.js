// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../../ReduxTypes.js'
import { UniqueIdentifierModal } from './UniqueIdentifierModal.ui.js'

export const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.uniqueIdentifierModal.isActive,
  uniqueIdentifier: state.ui.scenes.uniqueIdentifierModal.uniqueIdentifier || state.ui.scenes.sendConfirmation.parsedUri.uniqueIdentifier
})
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: Object) => ({
  uniqueIdentifierChanged: (uniqueIdentifier: string) => dispatch({ type: 'UNIQUE_IDENTIFIER_MODAL/DEACTIVATED', data: { uniqueIdentifier } }),
  onConfirm: (uniqueIdentifier: string) => {
    dispatch({ type: 'UNIQUE_IDENTIFIER_MODAL/DEACTIVATED' })
    ownProps.onConfirm(uniqueIdentifier)
  },
  onCancel: () => dispatch({ type: 'UNIQUE_IDENTIFIER_MODAL/DEACTIVATED' }),
  onBackdropPress: () => dispatch({ type: 'UNIQUE_IDENTIFIER_MODAL/DEACTIVATED' }),
  onBackbuttonPress: () => dispatch({ type: 'UNIQUE_IDENTIFIER_MODAL/DEACTIVATED' }),
  onModalHide: () => dispatch({ type: 'UNIQUE_IDENTIFIER_MODAL/RESET' })
})

export const UniqueIdentifierModalConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(UniqueIdentifierModal)
export default UniqueIdentifierModalConnect

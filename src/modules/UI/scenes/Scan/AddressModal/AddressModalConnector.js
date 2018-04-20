// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes'
import {
  inputChanged,
  confirmButtonPressed,
  cancelButtonPressed,
  backdropPressed,
  backButtonPressed,
  pasteButtonPressed,
  hidden
} from './AddressModalActions.js'
import { AddressModal } from './AddressModal.ui.js'

const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.scan.addressModal.isActive,
  input: state.ui.scenes.scan.addressModal.input
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  inputChanged: (input) => dispatch(inputChanged(input)),
  confirmButtonPressed: () => dispatch(confirmButtonPressed()),
  cancelButtonPressed: () => dispatch(cancelButtonPressed()),
  backdropPressed: () => dispatch(backdropPressed()),
  backButtonPressed: () => dispatch(backButtonPressed()),
  pasteButtonPressed: () => dispatch(pasteButtonPressed()),
  hidden: () => dispatch(hidden())
})

export const AddressModalConnector = connect(mapStateToProps, mapDispatchToProps)(AddressModal)
export default AddressModalConnector

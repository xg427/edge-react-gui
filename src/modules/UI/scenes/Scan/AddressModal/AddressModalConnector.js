// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes'
import {
  addressModalInputChanged,
  addressModalBackdropPressed,
  addressModalBackButtonPressed,
  addressModalPasteButtonPressed,
  addressModalHidden
} from '../scanActions.js'
import { AddressModal } from './AddressModal.ui.js'

const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.scan.addressModal.isActive,
  input: state.ui.scenes.scan.addressModal.input
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  inputChanged: (input) => dispatch(addressModalInputChanged(input)),
  backdropPressed: () => dispatch(addressModalBackdropPressed()),
  backButtonPressed: () => dispatch(addressModalBackButtonPressed()),
  pasteButtonPressed: () => dispatch(addressModalPasteButtonPressed()),
  hidden: () => dispatch(addressModalHidden())
})

export const AddressModalConnector = connect(mapStateToProps, mapDispatchToProps)(AddressModal)
export default AddressModalConnector

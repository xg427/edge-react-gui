// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes'
import { deactivated } from './AddressModalActions.js'
import { AddressModal } from './AddressModal.ui.js'

const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.scan.addressModal.isActive,
  input: state.ui.scenes.scan.input
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  backdropPressed: () => {
    dispatch(deactivated())
  },
  backButtonPressed: () => {
    dispatch(deactivated())
  }
})

export const AddressModalConnector = connect(mapStateToProps, mapDispatchToProps)(AddressModal)
export default AddressModalConnector

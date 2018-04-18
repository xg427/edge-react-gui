// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../../ReduxTypes.js'

import {
  legacyAddressModalContinueButtonPressed,
  legacyAddressModalCancelButtonPressed,
  legacyAddressModalBackButtonPressed,
  legacyAddressModalBackdropPressed,
  legacyAddressModalHidden
} from '../../scanActions.js'
import { LegacyAddressModalComponent } from './LegacyAddressModal.ui.js'

export const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.scan.legacyAddressModal.isActive,
  currencyName: state.ui.scenes.scan.legacyAddressModal.currencyName
})
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: { confirm: () => void }) => ({
  continueButtonPressed: () => {
    dispatch(legacyAddressModalContinueButtonPressed())
  },
  cancelButtonPressed: () => {
    dispatch(legacyAddressModalCancelButtonPressed())
  },
  backButtonPressed: () => {
    dispatch(legacyAddressModalBackButtonPressed())
  },
  backdropPressed: () => {
    dispatch(legacyAddressModalBackdropPressed())
  },
  reset: () => {
    dispatch(legacyAddressModalHidden())
  }
})

export const LegacyAddressModalConnector = connect(mapStateToProps, mapDispatchToProps)(LegacyAddressModalComponent)
export default LegacyAddressModalConnector

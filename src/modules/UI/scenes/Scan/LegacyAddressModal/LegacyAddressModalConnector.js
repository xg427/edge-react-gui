// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes.js'

import { deactivated } from './LegacyAddressModalActions.js'
import { LegacyAddressModal } from './LegacyAddressModal.ui.js'

export const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.scan.legacyAddressModal.isActive,
  currencyName: state.ui.scenes.scan.currencyName
})
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
  continueButtonPressed: () => {
    dispatch(deactivated())
    if (ownProps.continueButtonPressed) {
      dispatch(ownProps.continueButtonPressed())
    }
  },
  cancelButtonPressed: () => {
    dispatch(deactivated())
    if (ownProps.cancelButtonPressed) {
      dispatch(ownProps.cancelButtonPressed())
    }
  },
  backButtonPressed: () => {
    dispatch(deactivated())
  },
  backdropPressed: () => {
    dispatch(deactivated())
  }
})

export const LegacyAddressModalConnector = connect(mapStateToProps, mapDispatchToProps)(LegacyAddressModal)
export default LegacyAddressModalConnector

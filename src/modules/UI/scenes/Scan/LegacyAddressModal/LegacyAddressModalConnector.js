// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes.js'

import {
  continueButtonPressed,
  cancelButtonPressed,
  backButtonPressed,
  backdropPressed,
  hidden
} from './LegacyAddressModalActions.js'
import { LegacyAddressModalComponent } from './LegacyAddressModal.ui.js'

export const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.scan.legacyAddressModal.isActive,
  currencyName: state.ui.scenes.scan.legacyAddressModal.currencyName
})
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: { confirm: () => void }) => ({
  continueButtonPressed: () => {
    dispatch(continueButtonPressed())
  },
  cancelButtonPressed: () => {
    dispatch(cancelButtonPressed())
  },
  backButtonPressed: () => {
    dispatch(backButtonPressed())
  },
  backdropPressed: () => {
    dispatch(backdropPressed())
  },
  reset: () => {
    dispatch(hidden())
  }
})

export const LegacyAddressModalConnector = connect(mapStateToProps, mapDispatchToProps)(LegacyAddressModalComponent)
export default LegacyAddressModalConnector

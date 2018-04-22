// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes.js'

import { deactivated } from './WalletSelectorModalActions.js'
import { WalletSelectorModal } from './WalletSelectorModal.ui.js'

export const mapStateToProps = (state: State) => ({
  isActive: state.ui.scenes.scan.walletSelectorModal.isActive
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  backButtonPressed: () => {
    dispatch(deactivated())
  },
  backdropPressed: () => {
    dispatch(deactivated())
  }
})

export const WalletSelectorModalConnector = connect(mapStateToProps, mapDispatchToProps)(WalletSelectorModal)
export default WalletSelectorModalConnector

// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes.js'

import { PrivateKeyModal } from './PrivateKeyModal.ui.js'
import { onPrivateKeyAccept, onPrivateKeyReject } from './PrivateKeyModalActions.js'

export const mapStateToProps = (state: State) => ({})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onPrivateKeyAccept: () => {
    dispatch(onPrivateKeyAccept())
  },
  onPrivateKeyReject: () => {
    dispatch(onPrivateKeyReject())
  }
})

export const PrivateKeyModalConnector = connect(mapStateToProps, mapDispatchToProps)(PrivateKeyModal)
export default PrivateKeyModalConnector

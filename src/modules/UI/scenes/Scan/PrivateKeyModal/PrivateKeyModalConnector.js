// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../../ReduxTypes.js'

import { PrivateKeyModal } from './PrivateKeyModal.ui.js'

export const mapStateToProps = (state: State) => ({
  primaryModalIsActive: state.ui.scenes.scan.privateKeyModal.primaryModalIsActive,
  secondaryModalIsActive: state.ui.scenes.scan.privateKeyModal.secondaryModalIsActive
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const PrivateKeyModalConnector = connect(mapStateToProps, mapDispatchToProps)(PrivateKeyModal)
export default PrivateKeyModalConnector

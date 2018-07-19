// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../ReduxTypes'
import { updateMiningFees } from '../SendConfirmation/action'
import { getNetworkFeeOption } from '../SendConfirmation/selectors'
import ChangeMiningFee from './ChangeMiningFee.ui.js'
import type { ChangeMiningFeeDispatchProps, ChangeMiningFeeStateProps } from './ChangeMiningFee.ui.js'

export const mapStateToProps = (state: State): ChangeMiningFeeStateProps => ({
  feeSetting:
    state.ui.scenes.sendConfirmation.spendInfo && state.ui.scenes.sendConfirmation.spendInfo.networkFeeOption
      ? state.ui.scenes.sendConfirmation.spendInfo.networkFeeOption
      : 'standard'
})

export const mapDispatchToProps = (dispatch: Dispatch): ChangeMiningFeeDispatchProps => ({
  onSubmit: (networkFeeOption: 'low' | 'standard' | 'high') => dispatch(updateMiningFees({ networkFeeOption }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeMiningFee)

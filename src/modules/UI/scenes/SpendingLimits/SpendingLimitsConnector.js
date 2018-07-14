// @flow

import { connect } from 'react-redux'

import type { State } from '../../../ReduxTypes.js'
import { SpendingLimits } from './SpendingLimits.ui.js'
import { update as updateSpendingLimits } from '../../Settings/spendingLimits/spendingLimits.js'
import type { SpendingLimits as SpendingLimitsType } from '../../Settings/spendingLimits/spendingLimits.js'
import { getFiatSymbol } from '../../../utils.js'

export const mapStateToProps = (state: State) => ({
  currencySymbol: getFiatSymbol(state.ui.settings.defaultFiat),
  transactionSpendingLimit: {
    isEnabled: true,
    amount: 123
  },
  dailySpendingLimit: {
    isEnabled: false,
    amount: 34
  }
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (spendingLimits: SpendingLimitsType) => dispatch(updateSpendingLimits(spendingLimits))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpendingLimits)

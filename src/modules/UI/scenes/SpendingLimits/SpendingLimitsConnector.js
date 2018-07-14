// @flow

import { connect } from 'react-redux'

import type { State } from '../../../ReduxTypes.js'
import { SpendingLimits } from './SpendingLimits.ui.js'

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
export const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpendingLimits)

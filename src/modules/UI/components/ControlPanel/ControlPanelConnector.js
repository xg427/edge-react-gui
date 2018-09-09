// @flow

import { connect } from 'react-redux'

import * as CORE_SELECTORS from '../../../Core/selectors.js'
import type { Dispatch, State } from '../../../ReduxTypes.js'
import * as UI_SELECTORS from '../../../UI/selectors.js'
import * as SETTINGS_SELECTORS from '../../Settings/selectors.js'
import ControlPanel from './ControlPanel.ui'

const mapStateToProps = (state: State) => {
  let secondaryToPrimaryRatio = 0
  const guiWallet = UI_SELECTORS.getSelectedWallet(state)
  const currencyCode = UI_SELECTORS.getSelectedCurrencyCode(state)
  let primaryDisplayDenomination = null
  let primaryExchangeDenomination = null
  let secondaryDisplayAmount = '0'
  let secondaryDisplayCurrencyCode = ''
  let currencyLogo = ''

  if (guiWallet && currencyCode) {
    const isoFiatCurrencyCode = guiWallet.isoFiatCurrencyCode
    currencyLogo = guiWallet.symbolImage
    secondaryDisplayCurrencyCode = guiWallet.fiatCurrencyCode
    secondaryToPrimaryRatio = CORE_SELECTORS.getExchangeRate(state, currencyCode, isoFiatCurrencyCode)
    primaryDisplayDenomination = SETTINGS_SELECTORS.getDisplayDenominationFull(state, currencyCode)
    primaryExchangeDenomination = UI_SELECTORS.getExchangeDenomination(state, currencyCode)
    secondaryDisplayAmount =
      (parseFloat(1) *
        parseFloat(secondaryToPrimaryRatio) *
        // $FlowFixMe
        parseFloat(primaryDisplayDenomination.multiplier)) /
      parseFloat(primaryExchangeDenomination.multiplier)
  }

  return {
    currencyCode,
    currencyLogo,
    primaryDisplayCurrencyCode: currencyCode,
    primaryDisplayDenomination,
    primaryExchangeDenomination,
    secondaryDisplayCurrencyCode,
    secondaryDisplayAmount,
    secondaryToPrimaryRatio,
    usersView: state.ui.scenes.controlPanel.usersView,
    username: CORE_SELECTORS.getUsername(state)
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  openSelectUser: () => dispatch({ type: 'CONTROL_PANEL/OPEN_SELECT_USER' }),
  closeSelectUser: () => dispatch({ type: 'CONTROL_PANEL/CLOSE_SELECT_USER' })
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel)

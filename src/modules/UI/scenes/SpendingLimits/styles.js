// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../theme/variables/airbitz'

const debug = {
  // borderColor: 'red',
  // borderWidth: 1
}
export const rawStyles = {
  item: {
    ...debug,
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  gradient: {
    height: THEME.HEADER
  },
  passwordInput: {
    ...debug
  },
  spendingLimit: {
    ...debug
  },
  dailySpendingLimit: {},
  transactionSpendingLimit: {},
  submitButton: {}
}
export const styles = StyleSheet.create(rawStyles)
export default styles

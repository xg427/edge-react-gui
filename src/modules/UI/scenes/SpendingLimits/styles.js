// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../theme/variables/airbitz'

const debug = {
  borderColor: 'red',
  borderWidth: 1
}
export const rawStyles = {
  scene: {},
  gradient: {
    height: THEME.HEADER
  },
  item: {},
  passwordInput: {},
  spendingLimit: {},
  dailySpendingLimit: {},
  transactionSpendingLimit: {},
  submitButton: {},
  debug
}
export const styles = StyleSheet.create(rawStyles)
export default styles

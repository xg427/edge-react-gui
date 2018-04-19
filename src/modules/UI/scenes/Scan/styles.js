// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../theme/variables/airbitz.js'

export const rawStyles = {
  gradient: {
    height: THEME.HEADER
  },
  body: {
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: 72,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: THEME.COLORS.SECONDARY
  },
  item: {
    flex: 1,
    paddingHorizontal: 4
  },
  debug: {
    borderColor: 'red',
    borderWidth: 1
  },
  cancelUnderlay: {
    color: THEME.COLORS.GRAY_1
  },
  doneUnderlay: {
    color: THEME.COLORS.PRIMARY
  }
}
export const styles = StyleSheet.create(rawStyles)
export default styles

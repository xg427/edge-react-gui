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
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: THEME.COLORS.SECONDARY
  },
  item: {
    flex: 1,
    paddingHorizontal: 4
  }
}
export const styles = StyleSheet.create(rawStyles)
export default styles

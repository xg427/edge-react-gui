// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../../../theme/variables/airbitz.js'

export const rawStyles = {
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${THEME.COLORS.WHITE}${THEME.ALPHA.LOW}`,
    borderRadius: 3,
    height: 50
  },
  text: {
    color: THEME.COLORS.WHITE,
    fontSize: 14,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontFamily: THEME.FONTS.DEFAULT
  },
  underlay: {
    color: THEME.COLORS.SECONDARY
  }
}

export const styles = StyleSheet.create(rawStyles)
export default styles

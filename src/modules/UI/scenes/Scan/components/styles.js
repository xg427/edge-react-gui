// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../../theme/variables/airbitz.js'

export const rawStyles = {
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${THEME.COLORS.WHITE}${THEME.ALPHA.LOW}`,
    borderRadius: 3,
    paddingTop: 4
  },
  text: {
    color: THEME.COLORS.WHITE,
    fontSize: 14,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontFamily: THEME.FONTS.DEFAULT,
    alignSelf: 'center',
    alignItems: 'center'
  },
  underlay: {
    color: THEME.COLORS.SECONDARY
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
  }
}

export const styles = StyleSheet.create(rawStyles)
export default styles

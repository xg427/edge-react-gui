// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../../theme/variables/airbitz.js'

export const rawStyles = {
  camera: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  body: {
    flex: 1
  },
  overlay: {
    flex: 1
  },
  banner: {
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.GRAY_1,
    opacity: 0.95
  },
  bannerText: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONTS.DEFAULT
  },
  preview: {
    flex: 1
  },
  denied: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deniedText: {},
  pending: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red'
  }
}

export const styles = StyleSheet.create(rawStyles)
export default styles

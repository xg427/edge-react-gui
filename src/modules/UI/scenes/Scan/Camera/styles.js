// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../../theme/variables/airbitz.js'

export const rawStyles = {
  camera: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  overlay: {
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.GRAY_1,
    opacity: 0.95
  },
  overlayText: {
    color: THEME.COLORS.WHITE,
    fontSize: 14
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

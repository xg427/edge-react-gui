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
    flex: 1,
    opacity: 0.95
  },
  banner: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.GRAY_1
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

// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../../theme/variables/airbitz.js'

export const rawStyles = {
  modal: {
    padding: 0,
    margin: 0,
    paddingTop: 32
  },
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.WHITE,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14
  },
  header: {
    height: THEME.SPACER.HEADER,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 8,
    backgroundColor: THEME.COLORS.GRAY_2
  },
  body: {
    height: '100%'
  },
  item: {
    padding: 6,
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1
  },
  row: {
    padding: 12,
    flexDirection: 'row'
  },
  text: {
    fontSize: 22,
    fontFamily: THEME.FONTS.DEFAULT,
    color: THEME.COLORS.PRIMARY
  },
  scrollList: {

  },
  debug: {
    borderColor: 'red', borderWidth: 1
  }
}

export const styles = StyleSheet.create(rawStyles)

// @flow

import React, { Component } from 'react'
import { TextField } from 'react-native-material-textfield'

import { THEME } from '../../../../../theme/variables/airbitz.js'
import s from '../../../../../locales/strings.js'

const DEFAULTS = {
  secureTextEntry: false,
  tintColor: THEME.COLORS.SECONDARY,
  baseColor: THEME.COLORS.SECONDARY,
  label: s.strings.password
}

export type Props = {
  activeLineWidth?: number,
  affixTextStyle?: Object,
  animationDuration?: number,
  baseColor?: string,
  characterRestriction?: Array<string>,
  containerStyle?: Object,
  disabled?: boolean,
  disabledLineType?: string,
  disabledLineWidth?: number,
  editable?: boolean,
  error?: string,
  errorColor?: string,
  fontSize?: number,
  inputContainerPadding?: number,
  inputContainerStyle?: Object,
  label?: string,
  labelFontSize?: number,
  labelHeight?: number,
  labelPadding?: number,
  labelTextStyle?: Object,
  lineWidth?: number,
  multiline?: boolean,
  onBlur?: Function,
  onChangeText?: Function,
  onFocus?: Function,
  prefix?: string,
  renderAccessory?: boolean,
  secureTextEntry?: boolean,
  suffix?: string,
  textColor?: string,
  tintColor?: string,
  title?: string,
  titleFontSize?: number,
  titleTextStyle?: Object,
  value?: string
}
export type State = {}

export class PasswordInput extends Component<Props, State> {
  render () {
    const props = { ...DEFAULTS, ...this.props }
    return <TextField {...props} />
  }
}

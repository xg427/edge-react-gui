// @flow

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { TextField } from 'react-native-material-textfield'

import { styles } from './styles.js'

export type Props = {
  value: string,
  label: string,
  error: string,
  autoCapitalize: boolean,
  autoCorrect: boolean,
  autoFocus: boolean,
  forceFocus: boolean,
  returnKeyType: string,
  secureTextEntry: boolean,
  returnKeyType: string,
  keyboardType: string,
  placeholder: string,
  onFocus(): void,
  onSubmitEditing(): void,
  onBlur(): void,
  onChangeText(string): void,
  style?: StyleSheet.Styles
}

export class TextInput extends Component<Props> {
  static defaultProps = {
    autoCorrect: false,
    autoCapitalize: 'none',
    error: '',
    secureTextEntry: false,
    placeholder: '',
    editable: true,
    disabled: false,
    onFocus: () => {},
    onSubmitEditing: () => {},
    onBlur: () => {},
    onChangeText: () => {}
  }

  render () {
    return <TextField {...this.props} style={[styles.textInput, this.props.style]} />
  }
}

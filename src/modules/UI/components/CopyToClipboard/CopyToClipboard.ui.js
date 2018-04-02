// @flow

import React, { Component } from 'react'
import { Alert, Clipboard, TouchableWithoutFeedback } from 'react-native'

type Props = {
  value: string,
  children: Node,
  debug: boolean
}
export class CopyToClipboard extends Component<Props> {
  static defaultProps = {
    value: '',
    debug: false
  }

  render () {
    return (
      <TouchableWithoutFeedback onLongPress={this.copyToClipboard} {...this.props}>
        {this.props.children}
      </TouchableWithoutFeedback>
    )
  }

  copyToClipboard = () => {
    Promise.resolve(this.props.value)
      .then(Clipboard.setString)
      .then(Clipboard.getString)
      .then(this.debug)
  }

  debug = (value: string) => {
    if (this.props.debug) {
      Alert.alert(`Copied to clipboard: ${this.props.value}`)
    }
  }
}

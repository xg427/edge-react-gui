// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import RN, { TouchableHighlight, View } from 'react-native'

import { styles, rawStyles } from './styles.js'

export type TextProps = {
  children: Node,
  style?: Object
}
class Text extends Component<TextProps> {
  render () {
    return (
      <RN.Text style={[styles.text, this.props.style]}>
        {this.props.children}
      </RN.Text>
    )
  }
}

export type Props = {
  onPress: () => void,
  children: Node,
  style?: Object
}
export class Button extends Component<Props> {
  static Text = Text

  render () {
    return (
      <TouchableHighlight
        underlayColor={rawStyles.underlay.color}
        {...this.props}
        style={[styles.button, this.props.style]}>
        <View>
          {this.props.children}
        </View>
      </TouchableHighlight>
    )
  }
}

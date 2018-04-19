// @flow

import React, { Component } from 'react'
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
export class Button extends Component {
  static Text = Text
  render () {
    const { onPress } = this.props
    return (
      <TouchableHighlight
        underlayColor={rawStyles.underlayColor}
        {...this.props}
        style={[styles.button, this.props.styles]}>
        <View>
          {this.props.children}
        </View>
      </TouchableHighlight>
    )
  }
}

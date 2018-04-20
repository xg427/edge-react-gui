// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { StyleSheet, View } from 'react-native'

import { styles } from './styles.js'

type Props = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Footer extends Component<Props> {
  render () {
    return (
      <View {...this.props} style={[styles.footer, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

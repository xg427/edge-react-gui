// @flow

import React, { Component } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import type { Node } from 'react-native'

import { Body } from './Body.ui.js'
import { Item } from './Item.ui.js'
import { Footer } from './Footer.ui.js'
import { styles } from './styles.js'

type Props = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Scene extends Component<Props> {
  static Body = Body
  static Item = Item
  static Footer = Footer

  render () {
    return (
      <SafeAreaView {...this.props} style={[styles.scene, this.props.style]}>
        {this.props.children}
      </SafeAreaView>
    )
  }
}

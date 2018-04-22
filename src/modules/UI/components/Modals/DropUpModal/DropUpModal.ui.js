// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { StyleSheet, Text as RNText, View } from 'react-native'

import { default as Modal } from 'react-native-modal'
import { styles } from './styles.js'

// CONTAINER /////////////////////////////////////////////////////////////////////////////
export type ContainerProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Container extends Component<ContainerProps> {
  render () {
    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

// TEXT /////////////////////////////////////////////////////////////////////////////
export type TextProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Text extends Component<TextProps> {
  render () {
    return (
      <RNText {...this.props} style={[styles.text, this.props.style]}>
        {this.props.children}
      </RNText>
    )
  }
}

// HEADER /////////////////////////////////////////////////////////////////////////////
export type HeaderProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Header extends Component<HeaderProps> {
  static Text = Text

  render () {
    return (
      <View {...this.props} style={[styles.header, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

// BODY /////////////////////////////////////////////////////////////////////////////
type BodyProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Body extends Component<BodyProps> {
  render () {
    return (
      <View {...this.props} style={[styles.body, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

// ITEM /////////////////////////////////////////////////////////////////////////////
type ItemProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Item extends Component<ItemProps> {
  render () {
    return (
      <View {...this.props} style={[styles.item, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

// ROW /////////////////////////////////////////////////////////////////////////////
type RowProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Row extends Component<RowProps> {
  render () {
    return (
      <View {...this.props} style={[styles.row, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

// DROP_UP_MODAL /////////////////////////////////////////////////////////////////////////////
type Props = {
  isActive: boolean,
  children: Node,
  style?: StyleSheet.Styles
}
export class DropUpModal extends Component<Props> {
  static Container = Container
  static Header = Header
  static Body = Body
  static Item = Item
  static Row = Row

  render () {
    const { isActive } = this.props

    return (
      <Modal useNativeDriver hideModalContentWhileAnimating
        avoidKeyboard
        isVisible={isActive}
        {...this.props}
        style={[styles.modal, this.props.style]}>
        {this.props.children}
      </Modal>
    )
  }
}

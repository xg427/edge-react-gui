// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { default as Modal } from 'react-native-modal'

import { Gradient } from '../../Gradient/Gradient.ui.js'
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

// HEADER /////////////////////////////////////////////////////////////////////////////
export type HeaderProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Header extends Component<HeaderProps> {
  render () {
    return (
      <View style={[styles.header, this.props.style]}>
        <Gradient reverse style={[styles.gradient]}>
          {this.props.children}
        </Gradient>
      </View>
    )
  }
}

// FOOTER /////////////////////////////////////////////////////////////////////////////
export type FooterProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Footer extends Component<FooterProps> {
  render () {
    return (
      <View {...this.props} style={[styles.footer, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

// ICON /////////////////////////////////////////////////////////////////////////////
export type IconProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Icon extends Component<IconProps> {
  render () {
    return (
      <View {...this.props} style={[styles.icon, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

// MESSAGE /////////////////////////////////////////////////////////////////////////////
export type MessageProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Message extends Component<MessageProps> {
  render () {
    return (
      <Text {...this.props} style={[styles.message, this.props.style]}>
        {this.props.children}
      </Text>
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
      <View style={[styles.item, this.props.style]} {...this.props}>
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
      <View style={[styles.row, this.props.style]} {...this.props}>
        {this.props.children}
      </View>
    )
  }
}

// NON_INTERACTIVE_MODAL /////////////////////////////////////////////////////////////////////////////
export type Props = {
  children: Node,
  durationInSeconds: number,
  isVisible: boolean,
  onBackButtonPress?: () => void,
  onBackdropPress?: () => void,
  onExpire?: () => void,
  onModalHide: () => void,
  onModalShow: () => void
}
export class NonInteractiveModal extends Component<Props> {
  static Header = Header
  static Footer = Footer
  static Icon = Icon
  static Message = Message
  static Item = Item
  static Row = Row

  static defaultProps = {
    durationInSeconds: 8,
    onBackButtonPress: () => {},
    onBackdropPress: () => {},
    onExpire: () => {},
    onModalHide: () => {},
    onModalShow: () => {}
  }

  timer: number

  render () {
    const { isVisible, style, ...props } = this.props
    const children = React.Children.toArray(this.props.children)
    const icon = children.find(child => child.type === NonInteractiveModal.Icon)
    const footer = children.find(child => child.type === NonInteractiveModal.Footer)

    return (
      <Modal
        useNativeDriver
        hideModalContentWhileAnimating
        {...props}
        isVisible={isVisible}
        style={[styles.modal, style]}
        onModalShow={this.onModalShow}
        onModalHide={this.onModalHide}
      >
        <Container style={styles.container}>
          <Header>{icon}</Header>
          <Footer>{footer}</Footer>
        </Container>
      </Modal>
    )
  }

  onModalShow = () => {
    this.timer = setTimeout(this.props.onExpire, this.props.durationInSeconds * 1000)
    this.props.onModalShow()
  }

  onModalHide = () => {
    clearTimeout(this.timer)
    this.props.onModalHide()
  }
}

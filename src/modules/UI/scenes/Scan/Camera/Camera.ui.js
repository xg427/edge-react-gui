// @flow

import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text as RNText, View } from 'react-native'
import type { Node } from 'react-native'
import RNCamera from 'react-native-camera'

import { AUTHORIZED, DENIED, RESTRICTED, UNDETERMINED } from '../../../permissions.js'
import { styles } from './styles.js'

type BodyProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Body extends Component<BodyProps> {
  render () {
    return <View style={[styles.body, this.props.style]}>{this.props.children}</View>
  }
}

export type PreviewProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Preview extends Component<PreviewProps> {
  render () {
    const { torchMode, onBarCodeRead } = this.props
    return (
      <RNCamera
        style={[styles.preview, this.props.style]}
        ref={ref => {
          this.camera = ref
        }}
        barCodeTypes={[RNCamera.constants.BarCodeType.qr]}
        torchMode={torchMode}
        onBarCodeRead={onBarCodeRead}
      >
        {this.props.children}
      </RNCamera>
    )
  }
}

export type OverlayProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Overlay extends Component<OverlayProps> {
  render () {
    return <View style={[styles.overlay, this.props.style]}>{this.props.children}</View>
  }
}

export type TextProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Text extends Component<TextProps> {
  render () {
    return <RNText style={[styles.banner, this.props.style]}>{this.props.children}</RNText>
  }
}

export type BannerProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Banner extends Component<BannerProps> {
  Text = Text

  render () {
    return <Text style={[styles.banner, this.props.style]}>{this.props.children}</Text>
  }
}

export type DeniedProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Denied extends Component<DeniedProps> {
  render () {
    const DENIED_TEXT = s.strings.camera_permission_denied
    return <Text style={[styles.denied, this.props.style]}>{DENIED_TEXT}</Text>
  }
}

export type PendingProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Pending extends Component<PendingProps> {
  render () {
    return <ActivityIndicator size="large" style={[styles.pending, this.props.style]} />
  }
}

export type Props = {
  children: Node,
  style?: StyleSheet.Styles,
  cameraPermission: typeof AUTHORIZED | typeof RESTRICTED | typeof DENIED | typeof UNDETERMINED,
  scanIsEnabled: boolean,
  torchIsEnabled: boolean,
  onBarCodeRead: (input: string) => void
}
export class Camera extends Component<Props> {
  static Body = Body
  static Pending = Pending
  static Denied = Denied
  static Overlay = Overlay
  static Preview = Preview
  static Banner = Banner

  render () {
    const { scanIsEnabled, cameraPermission, torchIsEnabled, onBarCodeRead } = this.props
    const torchMode = torchIsEnabled ? RNCamera.constants.TorchMode.on : RNCamera.constants.TorchMode.off
    return (
      <Camera.Body>
        {cameraPermission === AUTHORIZED ? (
          <Camera.Preview torchMode={torchMode} onBarCodeRead={scanIsEnabled ? onBarCodeRead : null} />
        ) : cameraPermission === DENIED ? (
          <Camera.Denied />
        ) : cameraPermission === UNDETERMINED ? (
          <Camera.Pending />
        ) : null}
      </Camera.Body>
    )
  }
}

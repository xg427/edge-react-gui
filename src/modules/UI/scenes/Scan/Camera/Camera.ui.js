// @flow

import React, { Component } from 'react'
import { StyleSheet, Text as RNText, View } from 'react-native'
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
    return <View {...this.props} style={[styles.body, this.props.style]}>
      {this.props.children}
    </View>
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
    return <View {...this.props} style={[styles.overlay, this.props.style]}>
      {this.props.children}
    </View>
  }
}

export type TextProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Text extends Component<TextProps> {
  render () {
    return <RNText {...this.props} style={[styles.bannerText, this.props.style]}>
      {this.props.children}
    </RNText>
  }
}

export type BannerProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Banner extends Component<BannerProps> {
  static Text = Text

  render () {
    return <View {...this.props} style={[styles.banner, this.props.style]}>
      {this.props.children}
    </View>
  }
}

export type AuthorizedProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Authorized extends Component<AuthorizedProps> {
  render () {
    return <Camera.Body>
      {this.props.children}
    </Camera.Body>
  }
}

export type DeniedProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Denied extends Component<DeniedProps> {
  render () {
    return <Camera.Body>
      {this.props.children}
    </Camera.Body>
  }
}

export type PendingProps = {
  children: Node,
  style?: StyleSheet.Styles
}
class Pending extends Component<PendingProps> {
  render () {
    return <Camera.Body>
      {this.props.children}
    </Camera.Body>
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
  static Authorized = Authorized
  static Pending = Pending
  static Denied = Denied
  static Body = Body
  static Preview = Preview
  static Overlay = Overlay
  static Banner = Banner

  render () {
    // const { scanIsEnabled, cameraPermission, torchIsEnabled, onBarCodeRead } = this.props
    // const torchMode = torchIsEnabled ? RNCamera.constants.TorchMode.on : RNCamera.constants.TorchMode.off

    const { cameraPermission } = this.props
    const children = React.Children.toArray(this.props.children)
    const Authorized = children.find(child => child.type === Camera.Authorized)
    const Denied = children.find(child => child.type === Camera.Denied)
    const Pending = children.find(child => child.type === Camera.Pending)

    return (
      <Camera.Body>
        {cameraPermission === AUTHORIZED ? Authorized : cameraPermission === DENIED ? Denied : cameraPermission === UNDETERMINED ? Pending : null}
      </Camera.Body>
    )
  }
}

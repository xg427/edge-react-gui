// @flow

import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import type { Node } from 'react-native'
import RNCamera from 'react-native-camera'

import { AUTHORIZED, DENIED, RESTRICTED, UNDETERMINED } from '../../../permissions.js'
import s from '../../../../../locales/strings.js'
import { styles } from './styles.js'

class Overlay extends Component {
  render () {
    const HEADER_TEXT = s.strings.send_scan_header_text
    return (
      <View style={[styles.overlay]}>
        <Text style={[styles.overlayText]}>{HEADER_TEXT}</Text>
      </View>
    )
  }
}

class Denied extends Component {
  render () {
    const DENIED_TEXT = 'Camera permission denied' // s.strings.camera_permission_denied
    return (
      <View style={[styles.denied, this.props.style]}>
        <Text style={[styles.deniedText, this.props.textStyle]}>{DENIED_TEXT}</Text>
      </View>
    )
  }
}

class Pending extends Component {
  render () {
    return (
      <View style={[styles.pending, this.props.style]}>
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      </View>
    )
  }
}

export type Props = {
  children: Node,
  style?: StyleSheet.Styles,
  cameraIsAuthorized: boolean,
  scanIsEnabled: boolean,
  torchIsEnabled: boolean,
  onBarCodeRead: (input: string) => void
}
export type State = {}
export class Camera extends Component<Props, State> {
  static Pending = Pending
  static Denied = Denied
  static Overlay = Overlay

  render () {
    const { scanIsEnabled, cameraPermission, torchIsEnabled, onBarCodeRead } = this.props
    const torchMode = torchIsEnabled ? RNCamera.constants.TorchMode.on : RNCamera.constants.TorchMode.off
    if (cameraPermission === AUTHORIZED) {
      return (
        <RNCamera
          style={[styles.camera, this.props.style]}
          ref={ref => {
            this.camera = ref
          }}
          barCodeTypes={[RNCamera.constants.BarCodeType.qr]}
          torchMode={torchMode}
          onBarCodeRead={scanIsEnabled ? onBarCodeRead : null}
          permissionDialogTitle={s.strings.camera_permission_title}
          permissionDialogMessage={s.strings.camera_permission_message}
        >
          {this.props.children}
        </RNCamera>
      )
    } else if (cameraPermission === DENIED || cameraPermission === RESTRICTED) {
      return <Camera.Denied />
    } else if (cameraPermission === UNDETERMINED) {
      return <Camera.Pending />
    }
  }
}

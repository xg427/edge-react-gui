// @flow

import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import type { Node } from 'react-native'
import RNCamera from 'react-native-camera'

import s from '../../../../../locales/strings.js'
import styles from './styles.js'

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

const DENIED_PERMISSION_TEXT = s.strings.camera_permission_denied
class NotAuthorized extends Component {
  render () {
    return (
      <View style={[styles.notAuthorized]}>
        <Text style={styles.notAuthorizedText}>{DENIED_PERMISSION_TEXT}</Text>
      </View>
    )
  }
}

class Pending extends Component {
  render () {
    return (
      <View style={[styles.pending]}>
        <ActivityIndicator size='large' style={{flex: 1}} />
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
  static NotAuthorized = NotAuthorized
  static Overlay = Overlay

  render () {
    const { scanIsEnabled, cameraIsAuthorized, torchIsEnabled, onBarCodeRead } = this.props
    const torchMode = torchIsEnabled ? RNCamera.constants.TorchMode.on : RNCamera.constants.TorchMode.off
    if (cameraIsAuthorized) {
      return (
        <RNCamera
          style={[styles.camera, this.props.style]}
          ref={ref => {
            this.camera = ref
          }}
          barCodeTypes={[RNCamera.constants.BarCodeType.qr]}
          torchMode={torchMode}
          onBarCodeRead={scanIsEnabled ? onBarCodeRead : null}
          notAuthorizedView={Camera.NotAuthorized}
          pendingView={Camera.Pending}
          permissionDialogTitle={s.strings.camera_permission_title}
          permissionDialogMessage={s.strings.camera_permission_message}
        >
          {this.props.children}
        </RNCamera>
      )
    }
  }
}

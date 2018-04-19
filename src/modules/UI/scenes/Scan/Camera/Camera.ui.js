// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import RNCamera from 'react-native-camera'

import s from '../../../../../locales/strings.js'

class Overlay extends Component {
  render () {
    const HEADER_TEXT = s.strings.send_scan_header_text
    return (
      <View style={{flex: 1}}>
        <Text style={{flex: 1}}>{HEADER_TEXT}</Text>
      </View>
    )
  }
}

const DENIED_PERMISSION_TEXT = s.strings.camera_permission_denied
class NotAuthorized extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <Text style={{flex: 1}}>{DENIED_PERMISSION_TEXT}</Text>
      </View>
    )
  }
}

class Pending extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size='large' style={{flex: 1}} />
      </View>
    )
  }
}

export type Props = {
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
          style={{borderColor: 'red', borderWidth: 1, flex: 1}}
          ref={ref => {
            this.camera = ref
          }}
          barCodeTypes={[RNCamera.constants.BarCodeType.qr]}
          torchMode={torchMode}
          onBarCodeRead={scanIsEnabled ? onBarCodeRead : () => {}}
          notAuthorizedView={Camera.NotAuthorized}
          pendingView={Camera.Pending}
          permissionDialogTitle={s.strings.camera_permission_title}
          permissionDialogMessage={s.strings.camera_permission_message}
        >
          <Camera.Overlay />
        </RNCamera>
      )
    }
  }
}

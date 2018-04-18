// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text, TouchableHighlight, View } from 'react-native'
import Camera from 'react-native-camera'

// $FlowFixMe
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'

import s from '../../../../locales/strings.js'
import type { PermissionStatus } from '../../../ReduxTypes'
import ABAlert from '../../components/ABAlert/indexABAlert'
import T from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import { AUTHORIZED, DENIED } from '../../permissions'
import { AddressModalConnector as AddressModal } from './components/AddressModal/AddressModalConnector.js'
import { LegacyAddressModalConnector as LegacyAddressModal } from './components/LegacyAddressModal/LegacyAddressModalConnector.js'
import styles, { styles as rawStyles } from './styles.js'

type Props = {
  cameraPermission: PermissionStatus,
  torchEnabled: boolean,
  scanEnabled: boolean,
  torchButtonPressed: () => void,
  addressButtonPressed: () => void,
  parseUri: (data: string) => void
}

const HEADER_TEXT = s.strings.send_scan_header_text
const DENIED_PERMISSION_TEXT = ''
const ADDRESS_TEXT = s.strings.fragment_send_address
const FLASH_TEXT = s.strings.fragment_send_flash

export class Scan extends Component<Props> {
  render () {
    return (
      <SafeAreaView>
        <View style={{ flex: 1 }}>
          <Gradient style={styles.gradient} />
          <View style={styles.topSpacer} />

          <View style={styles.container}>
            {this.renderCamera()}

            <View style={[styles.overlay]}>
              <AddressModal onExitButtonFxn={() => {}} />

              <View style={[styles.overlayTop]}>
                <T style={[styles.overlayTopText]}>{HEADER_TEXT}</T>
              </View>

              <View style={[styles.overlayBlank]} />

              <Gradient style={[styles.overlayButtonAreaWrap]}>
                <TouchableHighlight style={styles.bottomButton} onPress={this.addressButtonPressed} underlayColor={rawStyles.underlay.color}>
                  <View style={styles.bottomButtonTextWrap}>
                    <FAIcon style={[styles.addressBookIcon]} name="address-book-o" size={18} />
                    <T style={[styles.addressButtonText, styles.bottomButtonText]}>{ADDRESS_TEXT}</T>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.bottomButton} onPress={this.torchButtonPressed} underlayColor={rawStyles.underlay.color}>
                  <View style={styles.bottomButtonTextWrap}>
                    <Ionicon style={[styles.flashIcon]} name="ios-flash-outline" size={24} />
                    <T style={[styles.flashButtonText, styles.bottomButtonText]}>{FLASH_TEXT}</T>
                  </View>
                </TouchableHighlight>
              </Gradient>
            </View>
            <ABAlert />
          </View>
        </View>
        {/* <LegacyAddressModal /> */}
      </SafeAreaView>
    )
  }

  torchButtonPressed = () => {
    this.props.torchButtonPressed()
  }

  addressButtonPressed = () => {
    this.props.addressButtonPressed()
  }

  onBarCodeRead = (scan: { data: string }) => {
    if (!this.props.scanEnabled) return
    const uri = scan.data
    this.parseUri(uri)
  }

  parseUri = (data: string) => {
    this.props.parseUri(data)
  }

  selectPhotoTapped = () => {
    const options = { takePhotoButtonTitle: null }

    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel && !response.error && !response.customButton) {
        Actions.sendConfirmation()
      }
    })
  }

  renderCamera = () => {
    if (this.props.cameraPermission === AUTHORIZED) {
      const torchMode = this.props.torchEnabled ? Camera.constants.TorchMode.on : Camera.constants.TorchMode.off

      return <Camera style={styles.preview} ref="cameraCapture" torchMode={torchMode} onBarCodeRead={this.onBarCodeRead} />
    } else if (this.props.cameraPermission === DENIED) {
      return (
        <View style={[styles.preview, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>{DENIED_PERMISSION_TEXT}</Text>
        </View>
      )
    } else {
      return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" style={{ flex: 1, alignSelf: 'center' }} />
        </View>
      )
    }
  }
}

export default Scan

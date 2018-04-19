// @flow

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import type { Node } from 'react-native'

import ABAlert from '../../components/ABAlert/indexABAlert'
import SafeAreaView from '../../components/SafeAreaView'
import { AddressModalConnector as AddressModal } from './AddressModal/AddressModalConnector.js'
// import { LegacyAddressModalConnector as LegacyAddressModal } from './LegacyAddressModal/LegacyAddressModalConnector.js'
import Camera from './Camera/CameraConnector.js'
import { TorchButton } from './TorchButton/TorchButton.ui.js'
import { ManualInputButton } from './ManualInputButton/ManualInputButton.ui.js'
import WalletListModal from '../../components/WalletListModal/WalletListModalConnector.js'
import * as Constants from '../../../../constants/indexConstants.js'
import Gradient from '../../components/Gradient/Gradient.ui.js'
import styles from './styles.js'

type BodyProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Body extends Component<BodyProps> {
  render () {
    return (
      <View style={{}}>
        {this.props.children}
      </View>
    )
  }
}

type FooterProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Footer extends Component<FooterProps> {
  render () {
    return (
      <View style={{}}>
        {this.props.children}
      </View>
    )
  }
}

type Props = {
  torchButtonPressed: () => void,
  addressButtonPressed: () => void,
  parseUri: (data: string) => void
}
export class Scan extends Component<Props> {
  render () {
    const { dataSubmitted } = this.props
    return (
      <SafeAreaView>
        <Gradient style={styles.gradient} />
        <View style={{}} />

        <Body>
          <Camera onBarCodeRead={dataSubmitted} />
        </Body>

        <Footer>
          <ManualInputButton />
          <TorchButton />
        </Footer>

        <ABAlert />
        <AddressModal onExitButtonFxn={() => {}} />
        {/* <LegacyAddressModal /> */}
        {/* <WalletListModal topDisplacement={Constants.SCAN_WALLET_DIALOG_TOP} type={Constants.FROM} /> */}
      </SafeAreaView>
    )
  }
}

export default Scan

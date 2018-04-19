// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { Node } from 'react-native'

import ABAlert from '../../components/ABAlert/indexABAlert'
import SafeAreaView from '../../components/SafeAreaView'
import { AddressModalConnector as AddressModal } from './AddressModal/AddressModalConnector.js'
// import { LegacyAddressModalConnector as LegacyAddressModal } from './LegacyAddressModal/LegacyAddressModalConnector.js'
import Camera from './Camera/CameraConnector.js'
import { TorchButton } from './TorchButton/TorchButton.ui.js'
import { ManualInputButton } from './ManualInputButton/ManualInputButton.ui.js'
import { Button } from './components/Button/Button.ui.js'
import WalletListModal from '../../components/WalletListModal/WalletListModalConnector.js'
import * as Constants from '../../../../constants/indexConstants.js'
import Gradient from '../../components/Gradient/Gradient.ui.js'
import { styles, rawStyles } from './styles.js'

type BodyProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Body extends Component<BodyProps> {
  render () {
    return (
      <View style={[styles.body, this.props.styles]}>
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
      <View style={[styles.footer, this.props.styles]}>
        {this.props.children}
      </View>
    )
  }
}

type ItemProps = {
  children: Node,
  style?: StyleSheet.Styles
}
export class Item extends Component<ItemProps> {
  render () {
    return (
      <View style={[styles.item, this.props.styles]}>
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

        <Body>
          <Camera onBarCodeRead={dataSubmitted} />
        </Body>

        <Footer>
          <Item>
            <Button>
              <Button.Text>
                <Text>Address</Text>
              </Button.Text>
            </Button>
          </Item>

          <Item>
            <Button>
              <Button.Text>
                <Text>Address</Text>
              </Button.Text>
            </Button>
          </Item>

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

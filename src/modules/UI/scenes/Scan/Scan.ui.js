// @flow

import React, { Component } from 'react'

import ABAlert from '../../components/ABAlert/indexABAlert'
import SafeAreaView from '../../components/SafeAreaView'
import { AddressModalConnector as AddressModal } from './AddressModal/AddressModalConnector.js'
// import { LegacyAddressModalConnector as LegacyAddressModal } from './LegacyAddressModal/LegacyAddressModalConnector.js'
import { NavBar } from './NavBar/NavBar.ui.js'
import { Body } from './Body/Body.ui.js'
import { Footer } from './Footer/Footer.ui.js'
import { Camera } from './Camera/CameraConnector.js'
import { TorchButton } from './TorchButton/TorchButton.ui.js'
import { ManualInputButton } from './ManualInputButton/ManualInputButton.ui.js'

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
        <NavBar onPress={() => {}} />

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
      </SafeAreaView>
    )
  }
}

export default Scan

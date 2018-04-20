// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text } from 'react-native'

import ABAlert from '../../components/ABAlert/indexABAlert'
import SafeAreaView from '../../components/SafeAreaView'
import { AddressModalConnector as AddressModal } from './AddressModal/AddressModalConnector.js'
// import { LegacyAddressModalConnector as LegacyAddressModal } from './LegacyAddressModal/LegacyAddressModalConnector.js'
import { Camera } from './Camera/Camera.ui.js'
import { Body } from './components/Body.ui.js'
import { Button } from './components/Button.ui.js'
import { Footer } from './components/Footer.ui.js'
import { Item } from './components/Item.ui.js'
// import WalletListModal from '../../components/WalletListModal/WalletListModalConnector.js'
import * as Constants from '../../../../constants/indexConstants.js'
import Gradient from '../../components/Gradient/Gradient.ui.js'
import { styles } from './styles.js'
import { Icon } from '../../components/Icon/Icon.ui.js'
import s from '../../../../locales/strings.js'
import { AUTHORIZED, DENIED, RESTRICTED, UNDETERMINED } from '../../permissions.js'

type Props = {
  torchButtonPressed: () => void,
  addressButtonPressed: () => void,
  cameraPermission: typeof AUTHORIZED | typeof DENIED | typeof RESTRICTED | typeof UNDETERMINED,
  scanIsEnabled: boolean,
  torchIsEnabled: boolean,
  dataSubmitted: string => void
}
export class Scan extends Component<Props> {
  render () {
    const { dataSubmitted, torchButtonPressed, addressButtonPressed, cameraPermission, scanIsEnabled, torchIsEnabled } = this.props
    return (
      <SafeAreaView>
        <Gradient style={styles.gradient} />

        <Body>
          <Camera permission={cameraPermission}>
            <Camera.Authorized>
              <Camera.Preview onBarCodeRead={dataSubmitted} torchIsEnabled={torchIsEnabled} scanIsEnabled={scanIsEnabled}>
                <Camera.Overlay>
                  <Camera.Banner>
                    <Camera.Banner.Text>
                      <Text>{s.strings.send_scan_header_text}</Text>
                    </Camera.Banner.Text>
                  </Camera.Banner>
                </Camera.Overlay>
              </Camera.Preview>
            </Camera.Authorized>

            <Camera.Pending>
              <ActivityIndicator size="large" />
            </Camera.Pending>

            <Camera.Denied>
              <Text>{'DENIED'}</Text>
            </Camera.Denied>
          </Camera>
        </Body>

        <Footer>
          <Item>
            <Button onPress={addressButtonPressed}>
              <Button.Text>
                <Icon style={{}} type={Constants.FONT_AWESOME} name={Constants.ADDRESS_BOOK_O} size={18} />
              </Button.Text>
              <Button.Text>
                <Text>{s.strings.fragment_send_address}</Text>
              </Button.Text>
            </Button>
          </Item>

          <Item>
            <Button onPress={torchButtonPressed}>
              <Button.Text>
                <Icon style={{}} type={Constants.ION_ICONS} name={Constants.FLASH} size={18} />
              </Button.Text>
              <Button.Text>
                <Text>{s.strings.fragment_send_flash}</Text>
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

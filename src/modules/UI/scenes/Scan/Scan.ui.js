// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text } from 'react-native'

// import ABAlert from '../../components/ABAlert/indexABAlert'
import SafeAreaView from '../../components/SafeAreaView'
import { ManualInputModalConnector as ManualInputModal } from './ManualInputModal/ManualInputModalConnector.js'
import { LegacyAddressModalConnector as LegacyAddressModal } from './LegacyAddressModal/LegacyAddressModalConnector.js'
import { Camera } from './Camera/Camera.ui.js'
import { Body } from './components/Body.ui.js'
import { Button } from './components/Button.ui.js'
import { Footer } from './components/Footer.ui.js'
import { Item } from './components/Item.ui.js'
// import WalletListModal from '../../components/WalletListModal/WalletListModalConnector.js'
import { WalletSelectorModalConnector as WalletSelectorModal } from './WalletSelectorModal/WalletSelectorModalConnector.js'
import * as Constants from '../../../../constants/indexConstants.js'
import Gradient from '../../components/Gradient/Gradient.ui.js'
import { styles } from './styles.js'
import { Icon } from '../../components/Icon/Icon.ui.js'
import s from '../../../../locales/strings.js'
import type { Permission, PermissionStatus } from '../../permissions.js'

type Props = {
  torchButtonPressed: () => void,
  addressButtonPressed: () => void,
  manualInputModalHidden: () => void,
  legacyAddressModalContinueButtonPressed: () => void,
  legacyAddressModalCancelButtonPressed: () => void,
  manualInputModalPasteButtonPressed: () => void,
  manualInputModalDoneButtonPressed: () => void,
  manualInputModalCancelButtonPressed: () => void,
  manualInputModalInputChanged: () => void,
  manualInputModalHidden: () => void,
  legacyAddressButtonPressed: () => void,
  inputChanged: (input: string) => void,
  permissions: {[Permission]: PermissionStatus},
  camera: {
    scan: { isEnabled: boolean },
    torch: { isEnabled: boolean }
  },
  dataSubmitted: string => void
}
export class Scan extends Component<Props> {
  render () {
    const {
      dataSubmitted,
      torchButtonPressed,
      addressButtonPressed,
      permissions,
      camera,
      legacyAddressModalContinueButtonPressed,
      legacyAddressModalCancelButtonPressed,
      manualInputModalPasteButtonPressed,
      manualInputModalDoneButtonPressed,
      manualInputModalCancelButtonPressed,
      manualInputModalInputChanged,
      manualInputModalHidden,
      legacyAddressButtonPressed,
      walletSelectorButtonPressed
    } = this.props
    return (
      <SafeAreaView>
        {/* <Gradient style={[styles.gradient, {borderColor: 'red', borderWidth: 1}]} /> */}

        <Body>
          <Camera permission={permissions.camera}>
            <Camera.Authorized>
              <Camera.Preview onBarCodeRead={dataSubmitted} torchIsEnabled={camera.torch.isEnabled} scanIsEnabled={camera.scan.isEnabled}>
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
              <ActivityIndicator size={'large'} />
            </Camera.Pending>

            <Camera.Denied>
              <Camera.Item>
                <Camera.Denied.Text>{s.strings.camera_permission_denied_title}</Camera.Denied.Text>
              </Camera.Item>
              <Camera.Item>
                <Camera.Denied.Text>{s.strings.camera_permission_denied_body}</Camera.Denied.Text>
              </Camera.Item>
            </Camera.Denied>
          </Camera>
        </Body>

        <Footer>
          <Item>
            <Button onPress={walletSelectorButtonPressed}>
              <Button.Text style={{fontSize: 12}}>
                <Icon style={{}} type={Constants.FONT_AWESOME} name={Constants.ADDRESS_BOOK_O} size={18} />
              </Button.Text>
              <Button.Text style={{fontSize: 12}}>
                <Text>{'Wallet Selector'}</Text>
              </Button.Text>
            </Button>
          </Item>

          <Item>
            <Button onPress={legacyAddressButtonPressed}>
              <Button.Text style={{fontSize: 12}}>
                <Icon style={{}} type={Constants.FONT_AWESOME} name={Constants.ADDRESS_BOOK_O} size={18} />
              </Button.Text>
              <Button.Text style={{fontSize: 12}}>
                <Text>{'Legacy Address'}</Text>
              </Button.Text>
            </Button>
          </Item>

          <Item>
            <Button onPress={addressButtonPressed}>
              <Button.Text style={{fontSize: 12}}>
                <Icon style={{}} type={Constants.FONT_AWESOME} name={Constants.ADDRESS_BOOK_O} size={18} />
              </Button.Text>
              <Button.Text style={{fontSize: 12}}>
                <Text>{s.strings.fragment_send_address}</Text>
              </Button.Text>
            </Button>
          </Item>

          <Item>
            <Button onPress={torchButtonPressed}>
              <Button.Text style={{fontSize: 12}}>
                <Icon style={{}} type={Constants.ION_ICONS} name={Constants.FLASH} size={18} />
              </Button.Text>
              <Button.Text style={{fontSize: 12}}>
                <Text>{s.strings.fragment_send_flash}</Text>
              </Button.Text>
            </Button>
          </Item>
        </Footer>

        <ManualInputModal hidden={manualInputModalHidden}
          inputChanged={manualInputModalInputChanged}
          pasteButtonPressed={manualInputModalPasteButtonPressed}
          doneButtonPressed={manualInputModalDoneButtonPressed}
          cancelButtonPressed={manualInputModalCancelButtonPressed} />

        <LegacyAddressModal
          continueButtonPressed={legacyAddressModalContinueButtonPressed}
          cancelButtonPressed={legacyAddressModalCancelButtonPressed} />

        {/* <ABAlert /> */}

        {/* <WalletListModal topDisplacement={Constants.SCAN_WALLET_DIALOG_TOP} type={Constants.FROM} /> */}
        <WalletSelectorModal
          dismissButtonPressed={() => {}}
          walletRowPressed={() => {}} />
      </SafeAreaView>
    )
  }
}

export default Scan

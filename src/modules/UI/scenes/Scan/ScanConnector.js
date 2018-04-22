// @flow

import { connect } from 'react-redux'

import { Scan } from './Scan.ui'
import type { Dispatch, State } from '../../../ReduxTypes'
import {
  addressButtonPressed,
  torchButtonPressed,
  dataSubmitted,
  inputChanged,
  inputReset,
  manualInputModalPasteButtonPressed,
  manualInputModalDoneButtonPressed,
  manualInputModalCancelButtonPressed,
  legacyAddressModalContinueButtonPressed,
  legacyAddressModalCancelButtonPressed,
  walletSelectorButtonPressed
} from './scanActions.js'

import { activated } from './LegacyAddressModal/LegacyAddressModalActions.js'

const mapStateToProps = (state: State) => ({
  selectWalletListIsActive: state.ui.scenes.scan.scanToWalletListModalVisibility,
  cameraPermission: state.permissions.camera,
  permissions: state.permissions,
  legacyAddressModal: state.ui.scenes.scan.legacyAddressModal,
  manualInputModal: state.ui.scenes.scan.manualInputModal,
  camera: state.ui.scenes.scan.camera
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  legacyAddressButtonPressed: () => {
    dispatch(activated())
  },
  dataSubmitted: data => {
    dispatch(dataSubmitted(data))
  },
  torchButtonPressed: () => {
    dispatch(torchButtonPressed())
  },
  addressButtonPressed: () => {
    dispatch(addressButtonPressed())
  },
  inputChanged: (input: string) => {
    dispatch(inputChanged(input))
  },
  manualInputModalPasteButtonPressed: () => {
    dispatch(manualInputModalPasteButtonPressed())
  },
  manualInputModalDoneButtonPressed: () => {
    dispatch(manualInputModalDoneButtonPressed())
  },
  manualInputModalCancelButtonPressed: () => {
    dispatch(manualInputModalCancelButtonPressed())
  },
  manualInputModalHidden: () => {
    dispatch(inputReset())
  },
  legacyAddressModalContinueButtonPressed: () => {
    dispatch(legacyAddressModalContinueButtonPressed())
  },
  legacyAddressModalCancelButtonPressed: () => {
    dispatch(legacyAddressModalCancelButtonPressed())
  },
  walletSelectorButtonPressed: () => {
    dispatch(walletSelectorButtonPressed())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Scan)

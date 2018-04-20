// @flow

import { connect } from 'react-redux'

import { Scan } from './Scan.ui'
import type { Dispatch, State } from '../../../ReduxTypes'
import { addressButtonPressed, torchButtonPressed, dataSubmitted, inputChanged, inputReset } from './scanActions.js'
import { activated } from './LegacyAddressModal/LegacyAddressModalActions.js'

const mapStateToProps = (state: State) => ({
  selectWalletListIsActive: state.ui.scenes.scan.scanToWalletListModalVisibility,
  cameraPermission: state.permissions.camera,
  permissions: state.permissions,
  legacyAddressModal: state.ui.scenes.scan.legacyAddressModal,
  manualInputModal: state.ui.scenes.scan.manualInputModal,
  camera: state.ui.scenes.scan.camera,
  scanIsEnabled: state.ui.scenes.scan.camera.scan.isEnabled,
  torchIsEnabled: state.ui.scenes.scan.camera.torch.isEnabled
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
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
  manualInputModalHidden: () => {
    dispatch(inputReset())
  },
  legacyAddressButtonPressed: () => {
    dispatch(activated())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Scan)

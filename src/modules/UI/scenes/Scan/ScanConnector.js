// @flow

import { connect } from 'react-redux'

import Scan from './Scan.ui'
import type { Dispatch, State } from '../../../ReduxTypes'
import { getCameraPermission } from '../../../../reducers/permissions/selectors'
import { toggleScanToWalletListModal } from '../../components/WalletListModal/action'
import {
  toggleAddressModal,
  toggleEnableTorch,
  onQrCodeScan,
  onLegacyAddressAccept,
  addressModalDoneButtonPressed,
  addressModalCancelButtonPressed
} from './action'

const mapStateToProps = (state: State) => ({
  cameraPermission: getCameraPermission(state),
  torchEnabled: state.ui.scenes.scan.torchEnabled,
  scanEnabled: state.ui.scenes.scan.scanEnabled,
  showToWalletModal: state.ui.scenes.scan.scanToWalletListModalVisibility
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onQrCodeScan: data => dispatch(onQrCodeScan(data)),
  toggleEnableTorch: () => dispatch(toggleEnableTorch()),
  toggleAddressModal: () => dispatch(toggleAddressModal()),
  toggleScanToWalletListModal: () => dispatch(toggleScanToWalletListModal()),
  onLegacyAddressAccept: () => dispatch(onLegacyAddressAccept()),
  addressModalDoneButtonPressed: data => dispatch(addressModalDoneButtonPressed(data)),
  addressModalCancelButtonPressed: () => dispatch(addressModalCancelButtonPressed())
})

export default connect(mapStateToProps, mapDispatchToProps)(Scan)

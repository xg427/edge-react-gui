// @flow

import { connect } from 'react-redux'

import { Scan } from './Scan.ui'
import type { Dispatch, State } from '../../../ReduxTypes'
import { addressButtonPressed, torchButtonPressed, dataSubmitted } from './scanActions.js'

const mapStateToProps = (state: State) => ({
  selectWalletListIsActive: state.ui.scenes.scan.scanToWalletListModalVisibility,
  cameraPermission: state.permissions.camera,
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Scan)

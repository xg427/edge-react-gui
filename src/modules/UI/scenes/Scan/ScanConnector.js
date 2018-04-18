// @flow

import { connect } from 'react-redux'

import Scan from './Scan.ui'
import type { Dispatch, State } from '../../../ReduxTypes'
import { getCameraPermission } from '../../../../reducers/permissions/selectors'
import { addressButtonPressed, torchButtonPressed, dataSubmitted } from './scanActions.js'

const mapStateToProps = (state: State) => ({
  cameraPermission: getCameraPermission(state),
  torchEnabled: state.ui.scenes.scan.camera.torch.isEnabled,
  scanEnabled: state.ui.scenes.scan.camera.isEnabled
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dataSubmitted: (data) => dispatch(dataSubmitted(data)),
  torchButtonPressed: () => dispatch(torchButtonPressed()),
  addressButtonPressed: () => dispatch(addressButtonPressed())
})

export default connect(mapStateToProps, mapDispatchToProps)(Scan)

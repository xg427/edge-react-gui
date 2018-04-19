// @flow

import { connect } from 'react-redux'

import Scan from './Scan.ui'
import type { Dispatch, State } from '../../../ReduxTypes'
import { getCameraPermission } from '../../../../reducers/permissions/selectors'

const mapStateToProps = (state: State) => ({
  cameraIsAuthorized: getCameraPermission(state),
  torchIsEnabled: state.ui.scenes.scan.camera.torch.isEnabled,
  scanIsEnabled: state.ui.scenes.scan.camera.scan.isEnabled
})
const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Scan)

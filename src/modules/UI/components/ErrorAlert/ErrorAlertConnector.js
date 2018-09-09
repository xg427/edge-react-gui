// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../ReduxTypes'
import ErrorAlert from './ErrorAlert.ui'

const mapStateToProps = (state: State) => ({
  displayAlert: state.ui.errorAlert.displayAlert,
  message: state.ui.errorAlert.message
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dismissAlert: () =>
    dispatch({
      type: 'ERROR_ALERT/DISMISS_ERROR_ALERT'
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorAlert)

// @flow

import { connect } from 'react-redux'

import type { Dispatch } from '../../../../ReduxTypes'
import HelpButton from './HelpButton.ui'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  openHelpModal: () => dispatch({ type: 'HELP_BUTTON/OPEN_HELP_MODAL' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpButton)

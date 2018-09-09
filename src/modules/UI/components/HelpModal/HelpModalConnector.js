// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../ReduxTypes'
import HelpModal from './HelpModal.ui'

const mapStateToProps = (state: State) => ({
  modal: state.ui.scenes.helpModal
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch({ type: 'HELP_MODAL/CLOSE_HELP_MODAL' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpModal)

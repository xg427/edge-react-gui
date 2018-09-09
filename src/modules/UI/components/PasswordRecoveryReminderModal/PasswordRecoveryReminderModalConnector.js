// @flow
import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../ReduxTypes.js'
import { PasswordRecoveryReminderModalComponent } from './PasswordRecoveryReminderModal.ui.js'
import { onGoToPasswordRecoveryScene } from './PasswordRecoveryReminderModalActions.js'

export const mapStateToProps = (state: State) => ({
  isVisible: state.ui.scenes.passwordRecoveryReminderModal.isVisible
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  hidePasswordRecoveryReminderModal: () => dispatch({ type: 'PASSWORD_RECOVERY_REMIDER_MODAL/HIDE_PASSWORD_RECOVERY_REMINDER_MODAL' }),
  onGoToPasswordRecoveryScene: () => dispatch(onGoToPasswordRecoveryScene())
})

export const PasswordRecoveryReminderModalConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecoveryReminderModalComponent)

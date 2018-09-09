// @flow

// import { type AccountAction } from './Core/Account/reducer.js'
// import { type ContextAction } from './Core/Context/action.js'
// import { type WalletsAction } from './Core/Wallets/action.js'
// import { type ExchangeRatesAction } from './ExchangeRates/action.js'
// import { type LogoutAction } from './Login/action.js'
// import { type SendLogsAction } from './Logs/action.js'
// import { type ABAlertAction } from './UI/components/ABAlert/action.js'
// import { type ControlPanelAction } from './UI/components/ControlPanel/action.js'
// import { type ErrorAlertAction } from './UI/components/ErrorAlert/actions.js'
// import { type HelpModalAction } from './UI/components/HelpModal/actions.js'
// import { type PasswordRecoveryReminderModalAction } from './UI/components/PasswordRecoveryReminderModal/PasswordRecoveryReminderModalActions.js'
// import { type PasswordReminderModalAction } from './UI/components/PasswordReminderModal/actions.js'

type LegacyAction = { type: string, data?: any }

export type Action = LegacyAction // remove once all actions have type definitions
//   | AccountAction // uncomment to get flow checking
//   | ContextAction // uncomment to get flow checking
//   | WalletsAction // uncomment to get flow checking
//   | ExchangeRatesAction // uncomment to get flow checking
//   | LogoutAction // uncomment to get flow checking
//   | SendLogsAction // uncomment to get flow checking
//   | ABAlertAction // uncomment to get flow checking
//   | ControlPanelAction // uncomment to get flow checking
//   | DropdownAlertAction // uncomment to get flow checking
//   | ErrorAlertAction // uncomment to get flow checking
//   | HelpModalAction // uncomment to get flow checking
//   | PasswordRecoveryReminderModalAction // uncomment to get flow checking
//   | PasswordReminderModalAction // uncomment to get flow checking

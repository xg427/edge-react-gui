// @flow

// import { type AccountAction } from './Core/Account/reducer.js'
// import { type ContextAction } from './Core/Context/action.js'
// import { type WalletsAction as EdgeWalletsAction } from './Core/Wallets/action.js'
// import { type ExchangeRatesAction } from './ExchangeRates/action.js'
// import { type LogoutAction } from './Login/action.js'
// import { type SendLogsAction } from './Logs/action.js'
// import { type ABAlertAction } from './UI/components/ABAlert/action.js'
// import { type ControlPanelAction } from './UI/components/ControlPanel/action.js'
// import { type DropdownAlertAction } from './UI/components/DropdownAlert/actions.js'
// import { type ErrorAlertAction } from './UI/components/ErrorAlert/actions.js'
// import { type HelpModalAction } from './UI/components/HelpModal/actions.js'
// import { type PasswordRecoveryReminderModalAction } from './UI/components/PasswordRecoveryReminderModal/PasswordRecoveryReminderModalActions.js'
// import { type PasswordReminderModalAction } from './UI/components/PasswordReminderModal/actions.js'
// import { type TransactionAlertAction } from './UI/components/TransactionAlert/actions.js'
// import { type WalletListModalAction } from './UI/components/WalletListModal/action.js'
// import { type DimensionsAction } from './UI/dimensions/action.js'
// import { type RequestAction } from './UI/Request/action.js'
// import { type WalletsAction } from './UI/Wallets/action.js'
// import { type SettingsAction } from './UI/Settings/action.js'
// import { type EdgeLoginAction } from '../actions/EdgeLoginActions.js'
// import { type OtpAction } from '../actions/OtpActions.js'
// import { type AddTokenAction } from './UI/scenes/AddToken/action.js'
// import { type CreateWalletAction } from './UI/scenes/CreateWallet/action.js'
// import { type EditTokenAction } from './UI/scenes/EditToken/action.js'
// import { type RequestAction as RequestSceneAction } from './UI/scenes/Request/action.js'
// import { type LegacyAddressModalAction } from './UI/scenes/Scan/LegacyAddressModal/LegacyAddressModalActions.js'
// import { type PrivateKeyModalAction } from './UI/scenes/Scan/PrivateKeyModal/PrivateKeyModalActions.js'
// import { type ScanAction } from './UI/scenes/Scan/action.js'
// import { type UniqueIdentifierModalAction } from './UI/scenes/SendConfirmation/components/UniqueIdentifierModal/UniqueIdentifierModalActions.js'
// import { type SendConfirmationAction } from './UI/scenes/SendConfirmation/action.js'

type LegacyAction = { type: string, data?: any }

export type Action = LegacyAction // remove once all actions have type definitions
//   | AccountAction // uncomment to get flow checking
//   | ContextAction // uncomment to get flow checking
//   | EdgeWalletsAction // uncomment to get flow checking
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
//   | TransactionAlertAction // uncomment to get flow checking
//   | WalletListModalAction // uncomment to get flow checking
//   | DimensionsAction // uncomment to get flow checking
//   | RequestAction // uncomment to get flow checking
//   | WalletsAction // uncomment to get flow checking
//   | SettingsAction // uncomment to get flow checking
//   | EdgeLoginAction // uncomment to get flow checking
//   | OtpAction // uncomment to get flow checking
//   | AddTokenAction // uncomment to get flow checking
//   | CreateWalletAction // uncomment to get flow checking
//   | EditTokenAction // uncomment to get flow checking
//   | RequestSceneAction // uncomment to get flow checking
//   | LegacyAddressModalAction // uncomment to get flow checking
//   | PrivateKeyModalAction // uncomment to get flow checking
//   | ScanAction // uncomment to get flow checking
//   | UniqueIdentifierModalAction // uncomment to get flow checking
//   | SendConfirmationAction // uncomment to get flow checking

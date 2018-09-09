// @flow

// import { type AccountAction } from './Core/Account/reducer.js'
// import { type ContextAction } from './Core/Context/action.js'
// import { type WalletsAction } from './Core/Wallets/action.js'
// import { type ExchangeRatesAction } from './ExchangeRates/action.js'

type LegacyAction = { type: string, data?: any }

export type Action = LegacyAction // remove once all actions have type definitions
//   | AccountAction // uncomment to get flow checking
//   | ContextAction // uncomment to get flow checking
//   | WalletsAction // uncomment to get flow checking
//   | ExchangeRatesAction // uncomment to get flow checking

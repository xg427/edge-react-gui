// @flow

// import { type AccountAction } from './Core/Account/reducer.js'
// import { type ContextAction } from './Core/Context/action.js'

type LegacyAction = { type: string, data?: any }

export type Action = LegacyAction // remove once all actions have type definitions
//   | AccountAction // uncomment to get flow checking
//   | ContextAction // uncomment to get flow checking

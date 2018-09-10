// @flow

import { Actions } from 'react-native-router-flux'

import type { CustomTokenInfo } from '../../../../types.js'
import * as SETTINGS_API from '../../../Core/Account/settings.js'
import * as CORE_SELECTORS from '../../../Core/selectors.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'
import type { Dispatch, GetState, State } from '../../../ReduxTypes'
import * as UTILS from '../../../utils.js'
import * as UI_WALLET_SELECTORS from '../../selectors.js'
import * as WALLET_ACTIONS from '../../Wallets/action.js'

type AddTokenStartAction = {
  type: 'ADD_TOKEN/ADD_TOKEN_START'
}

type AddTokenSuccessAction = {
  type: 'ADD_TOKEN/ADD_TOKEN_SUCCESS'
}

type SetTokenSettingsAction = {
  type: 'ADD_TOKEN/SET_TOKEN_SETTINGS',
  data: CustomTokenInfo
}

type AddNewCustomTokenSuccessAction = {
  type: 'ADD_TOKEN/ADD_NEW_CUSTOM_TOKEN_SUCCESS',
  data: { walletId: string, tokenObj: CustomTokenInfo, settings: Object, enabledTokens: Array<string>, newCurrencyCode: string }
}

type AddNewCustomTokenFailureAction = {
  type: 'ADD_TOKEN/ADD_NEW_CUSTOM_TOKEN_FAILURE',
  data: { errorMessage: string }
}

export type AddTokenAction =
  | AddTokenStartAction
  | AddTokenSuccessAction
  | SetTokenSettingsAction
  | AddNewCustomTokenSuccessAction
  | AddNewCustomTokenFailureAction

export const addNewToken = (walletId: string, currencyName: string, currencyCode: string, contractAddress: string, denomination: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: 'ADD_TOKEN/ADD_TOKEN_START' })
    const state = getState()
    addTokenAsync(walletId, currencyName, currencyCode, contractAddress, denomination, state)
      .then(addedWalletInfo => {
        const { walletId, newTokenObj, setSettings, enabledTokensOnWallet } = addedWalletInfo
        dispatch({
          type: 'ADD_TOKEN/ADD_NEW_CUSTOM_TOKEN_SUCCESS',
          data: { walletId, tokenObj: newTokenObj, settings: setSettings, enabledTokens: enabledTokensOnWallet, newCurrencyCode: newTokenObj.currencyCode }
        })
        dispatch(WALLET_ACTIONS.refreshWallet(walletId))
        Actions.pop()
      })
      .catch(error => {
        dispatch({ type: 'ADD_TOKEN/ADD_NEW_CUSTOM_TOKEN_FAILURE', data: { errorMessage: error.message } })
        console.log(error)
        dispatch({ type: 'ERROR_ALERT/DISPLAY_ERROR_ALERT', data: { message: error.message } })
      })
  }
}

export async function addTokenAsync (walletId: string, currencyName: string, currencyCode: string, contractAddress: string, denomination: string, state: State) {
  // create modified object structure to match metaTokens
  const newTokenObj: CustomTokenInfo = WALLET_ACTIONS.assembleCustomToken(currencyName, currencyCode, contractAddress, denomination)
  const account = CORE_SELECTORS.getAccount(state)
  const uiWallet = UI_WALLET_SELECTORS.getWallet(state, walletId)
  const coreWallet = CORE_SELECTORS.getWallet(state, walletId)
  await coreWallet.addCustomToken(newTokenObj)
  coreWallet.enableTokens([currencyCode])
  const settingsOnFile = await SETTINGS_API.getSyncedSettingsAsync(account)

  const setSettings = settingsOnFile
  const customTokens = settingsOnFile.customTokens
  let newCustomTokens = []
  if (!customTokens || customTokens.length === 0) {
    // if customTokens array is empty
    newCustomTokens = [newTokenObj]
  } else {
    newCustomTokens = UTILS.mergeTokens([newTokenObj], customTokens) // otherwise merge metaTokens and customTokens
  }
  settingsOnFile.customTokens = newCustomTokens
  settingsOnFile[currencyCode] = newTokenObj
  await SETTINGS_API.setSyncedSettingsAsync(account, settingsOnFile)
  const newEnabledTokens = uiWallet.enabledTokens
  if (uiWallet.enabledTokens.indexOf(newTokenObj.currencyCode) === -1) {
    newEnabledTokens.push(newTokenObj.currencyCode)
  }
  await WALLET_API.setEnabledTokens(coreWallet, newEnabledTokens)
  return { walletId, newTokenObj, setSettings, enabledTokensOnWallet: newEnabledTokens }
}

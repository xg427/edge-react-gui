// @flow

import type { EdgeLobby } from 'edge-core-js'
import { Actions } from 'react-native-router-flux'

type ProcessLoginAction = {
  type: 'EDGE_LOGIN/PROCESS_LOGIN'
}

type SaveLobbyAction = {
  type: 'EDGE_LOGIN/SAVE_LOBBY',
  data: EdgeLobby
}

type InvalidateLobbyAction = {
  type: 'EDGE_LOGIN/INVALIDATE_LOBBY'
}

type SetLobbyErrorAction = {
  type: 'EDGE_LOGIN/SET_LOBBY_ERROR',
  data: string
}

export type EdgeLoginAction = ProcessLoginAction | SaveLobbyAction | InvalidateLobbyAction | SetLobbyErrorAction

export const loginWithEdge = (url: string) => async (dispatch: any, getState: any) => {
  const splitArray = url.split('edge/')
  const state = getState()
  const account = state.core.account
  const lobby: EdgeLobby = await account.fetchLobby(splitArray[1]).catch(error => {
    dispatch({ type: 'EDGE_LOGIN/SET_LOBBY_ERROR', data: error.message })
  })
  if (lobby) {
    dispatch({ type: 'EDGE_LOGIN/SAVE_LOBBY', data: lobby })
  }
}

export const lobbyLogin = () => async (dispatch: any, getState: any) => {
  const state = getState()
  dispatch({ type: 'EDGE_LOGIN/PROCESS_LOGIN' })
  await state.core.edgeLogin.lobby.loginRequest.approve()
  dispatch({ type: 'EDGE_LOGIN/INVALIDATE_LOBBY' })
  Actions.pop()
}

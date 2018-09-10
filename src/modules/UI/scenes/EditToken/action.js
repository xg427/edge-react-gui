// @flow

type ShowDeleteTokenModalAction = {
  type: 'EDIT_TOKEN/SHOW_DELETE_TOKEN_MODAL'
}

type HideDeleteModalTokenAction = {
  type: 'EDIT_TOKEN/HIDE_DELETE_TOKEN_MODAL'
}

export type EditTokenAction = ShowDeleteTokenModalAction | HideDeleteModalTokenAction

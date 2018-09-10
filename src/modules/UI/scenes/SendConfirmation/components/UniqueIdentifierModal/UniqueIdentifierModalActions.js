// @flow

type ActivatedAction = {
  type: 'UNIQUE_IDENTIFIER_MODAL/ACTIVATED'
}

type DeactivatedAction = {
  type: 'UNIQUE_IDENTIFIER_MODAL/DEACTIVATED'
}

type ResetAction = {
  type: 'UNIQUE_IDENTIFIER_MODAL/RESET'
}

type ChangedAction = {
  type: 'UNIQUE_IDENTIFIER_MODAL/CHANGED',
  data: { uniqueIdentifier: string }
}

export type UniqueIdentifierModalAction = ChangedAction | ActivatedAction | DeactivatedAction | ResetAction

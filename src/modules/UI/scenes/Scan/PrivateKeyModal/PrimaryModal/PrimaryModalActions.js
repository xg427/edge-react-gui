// @flow

type ActivatedAction = {
  type: 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_ACTIVATED'
}

type DeactivatedAction = {
  type: 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_DEACTIVATED'
}

export type PrimaryModalAction = ActivatedAction | DeactivatedAction

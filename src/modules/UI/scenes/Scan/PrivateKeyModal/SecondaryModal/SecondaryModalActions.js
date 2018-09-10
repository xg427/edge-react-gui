// @flow

type ActivatedAction = {
  type: 'PRIVATE_KEY_MODAL/SECONDARTY_MODAL_ACTIVATED'
}

type DeactivatedAction = {
  type: 'PRIVATE_KEY_MODAL/SECONDARTY_MODAL_DEACTIVATED'
}

export type SecondaryModalAction = ActivatedAction | DeactivatedAction

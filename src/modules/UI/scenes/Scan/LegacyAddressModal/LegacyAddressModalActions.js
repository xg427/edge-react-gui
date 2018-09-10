// @flow

type ActivatedAction = {
  type: 'LEGACY_ADDRESS_MODAL/ACTIVATED'
}

type DeactivatedAction = {
  type: 'LEGACY_ADDRESS_MODAL/DEACTIVATED'
}

type ToggledAction = {
  type: 'LEGACY_ADDRESS_MODAL/TOGGLED'
}

export type LegacyAddressModalAction = ActivatedAction | DeactivatedAction | ToggledAction

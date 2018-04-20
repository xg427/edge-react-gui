// @flow

export const PREFIX = 'ADDRESS_MODAL/'

export const ACTIVATED = PREFIX + 'ACTIVATED'
export const activated = (input: string) => ({
  type: ACTIVATED,
  data: { input }
})

export const DEACTIVATED = PREFIX + 'DEACTIVATED'
export const deactivated = () => ({
  type: DEACTIVATED
})

export const TOGGLED = PREFIX + 'TOGGLED'
export const toggled = () => ({
  type: TOGGLED
})

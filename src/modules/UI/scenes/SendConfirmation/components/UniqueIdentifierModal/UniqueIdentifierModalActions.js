// @flow

export const ACTIVATED = 'UNIQUE_IDENTIFIER_MODAL/ACTIVATED'
export const DEACTIVATED = 'UNIQUE_IDENTIFIER_MODAL/DEACTIVATED'
export const UNIQUE_IDENTIFIER_CHANGED = 'UNIQUE_IDENTIFIER_MODAL/UNIQUE_IDENTIFIER_CHANGED'
export const RESET = 'UNIQUE_IDENTIFIER_MODAL/RESET'

export const activated = () => ({
  type: ACTIVATED
})

export const deactivated = () => ({
  type: DEACTIVATED
})

export const reset = () => ({
  type: RESET
})

export const uniqueIdentifierChanged = (uniqueIdentifier: string) => ({
  type: UNIQUE_IDENTIFIER_CHANGED,
  data: { uniqueIdentifier }
})

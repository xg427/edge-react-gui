// @flow

export const PREFIX = 'LEGACT_ADDRESS_MODAL/'

export const ACTIVATED = PREFIX + 'ACTIVATED'
export const activated = () => ({
  type: ACTIVATED
})

export const DEACTIVATED = PREFIX + 'DEACTIVATED'
export const deactivated = () => ({
  type: DEACTIVATED
})

export const TOGGLED = PREFIX + 'TOGGLED'
export const toggled = () => ({
  type: TOGGLED
})

export const DEPLOYED = PREFIX + 'DEPLOYED'
export const deployed = () => ({
  type: DEPLOYED
})

export const HIDDEN = PREFIX + 'HIDDEN'
export const hidden = () => ({
  type: HIDDEN
})

export const BACKDROP_PRESSED = PREFIX + 'BACKDROP_PRESSED'
export const backdropPressed = () => ({
  type: BACKDROP_PRESSED
})

export const BACK_BUTTON_PRESSED = PREFIX + 'BACK_BUTTON_PRESSED'
export const backButtonPressed = () => ({
  type: BACK_BUTTON_PRESSED
})

export const CONTINUE_BUTTON_PRESSED = PREFIX + 'CONTINUE_BUTTON_PRESSED'
export const continueButtonPressed = () => ({
  type: CONTINUE_BUTTON_PRESSED
})

export const CANCEL_BUTTON_PRESSED = PREFIX + 'CANCEL_BUTTON_PRESSED'
export const cancelButtonPressed = () => ({
  type: CANCEL_BUTTON_PRESSED
})

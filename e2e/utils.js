/* eslint-disable flowtype/require-valid-file-annotation */
/* globals device expect element by */

export const navigateToHome = async () => {
  // NAVIGATE TO HOME
  const loginScene = element(by.id('edge: login-scene'))
  const exitPinButton = element(by.text('EXIT PIN'))

  await expect(loginScene).toExist()
  await expect(exitPinButton).toExist()
  await exitPinButton.tap()
}

export const launchAppWithPermissions = async () => {
  await device.launchApp({
    permissions: {
      notifications: 'YES',
      camera: 'YES',
      contacts: 'YES'
    }
  })
}

export const loginWithPin = async () => {
  const pinInput = element(by.id('edge-login-rn: pin-input'))
  const walletListScene = element(by.id('edge: wallet-list-scene'))

  // VERIFY PIN LOGIN
  await expect(pinInput).toExist()

  // VALID PIN
  await pinInput.typeText('1234')
  await expect(walletListScene).toExist()
}

export const loginWithPassword = async () => {
  const usernameInput = element(by.type('RCTTextField')).atIndex(1)
  const passwordInput = element(by.type('RCTTextField')).atIndex(0)
  const loginButton = element(by.text('Login'))
  const walletListScene = element(by.id('edge: wallet-list-scene'))

  await expect(usernameInput).toBeVisible()
  await expect(passwordInput).toBeVisible()
  await expect(loginButton).toExist()

  await usernameInput.clearText()
  await usernameInput.typeText('JS test 0')
  await passwordInput.typeText('y768Mv4PLFupQjMu')

  await loginButton.tap()
  await expect(walletListScene).toExist()
}

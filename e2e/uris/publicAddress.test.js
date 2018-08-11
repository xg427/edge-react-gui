/* eslint-disable flowtype/require-valid-file-annotation */
/* globals describe beforeEach expect it element by */

import { launchAppWithPermissions, navigateToHome, loginWithPassword } from '../utils.js'

beforeEach(async () => {
  await launchAppWithPermissions()
  await navigateToHome()
  await loginWithPassword()
})

describe('scanning valid public address uri', () => {
  it('should navigate to send confirmation', async () => {
    // MATCHERS
    const scanTabButton = element(by.id('edge: scan-tab-icon')).atIndex(0)
    const scanScene = element(by.id('edge: scan-scene'))
    const addressModalButton = element(by.id('edge: address-modal-button'))
    const addressModalModal = element(by.id('edge: address-modal'))
    const addressModalTextInput = element(by.type('RCTTextField')).atIndex(1)
    // const addressModalTextInput = element(by.id('edge: address-modal-text-input'))

    // NAVIGATE TO SCAN SCENE
    await expect(scanTabButton).toExist()
    await scanTabButton.tap()
    await expect(scanScene).toExist()

    // DISPLAY MANUAL INPUT MODAL
    await expect(addressModalButton).toExist()
    await addressModalButton.tap()
    await expect(addressModalModal).toExist()

    // INPUT VALID PUBLIC ADDRESS
    await expect(addressModalTextInput).toExist()
    await addressModalTextInput.typeText('5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF')
  })
})

/*
BTC Private: 5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF
BTC Legacy: 12ekbhN5kseT1DB7p4MyzWtqwqkC7PDR4u
BCH: bitcoincash:qqhxsnz6ce87c7mvk4mkdwm52ukzujfg3vqxf5j64n
LTC: MGEDnugViWRA6arX3wrhw9vZtjxuznmoSB
LTC Legacy: 3A25V2GXmPZjJ5acx4sN7WgAa3NTzVk6jG
INVALID_URI
*/

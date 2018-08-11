/* eslint-disable flowtype/require-valid-file-annotation */
/* globals describe beforeEach it */

import { launchAppWithPermissions, navigateToHome, loginWithPassword } from '../utils.js'

beforeEach(async () => {
  await launchAppWithPermissions()
  await navigateToHome()
})

describe.skip('Edge', () => {
  it('should be able to password login', async () => {
    await loginWithPassword()
  })
})

/* eslint-disable flowtype/require-valid-file-annotation */
/* globals describe beforeEach it */

import { launchAppWithPermissions, loginWithPin } from '../utils.js'

beforeEach(async () => {
  await launchAppWithPermissions()
})

describe.skip('Pin Login', () => {
  it('should be able to pin login', async () => {
    await loginWithPin()
  })
})

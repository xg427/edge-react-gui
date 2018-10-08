// @flow

import type { EdgeContext, EdgeContextOptions, EdgeCorePluginFactory } from 'edge-core-js'
import { makeEdgeContext, makeFakeContexts } from 'edge-core-js'

import ENV from '../../env.json'

const { AIRBITZ_API_KEY, SHAPESHIFT_API_KEY } = ENV

function makeContext (pluginFactories: Array<EdgeCorePluginFactory> = []): Promise<EdgeContext> {
  const opts: EdgeContextOptions = {
    apiKey: AIRBITZ_API_KEY,
    plugins: pluginFactories,
    shapeshiftKey: SHAPESHIFT_API_KEY
  }

  if (ENV.USE_FAKE_CORE) {
    const [context] = makeFakeContexts({ ...opts, localFakeUser: true, tempNoBridge$: false })
    return Promise.resolve(context)
  }

  return makeEdgeContext(opts)
}

export { makeContext }

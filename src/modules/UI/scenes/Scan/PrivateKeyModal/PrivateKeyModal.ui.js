// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import type { EdgeParsedUri } from 'edge-core-js'

import { PrimaryModalConnector as PrimaryModal } from './PrimaryModal/PrimaryModalConnector.js'
import { SecondaryModalConnector as SecondaryModal } from './SecondaryModal/SecondaryModalConnector.js'

type Props = {
  parsedUri: EdgeParsedUri,
  onAccept: () => void,
  onReject: () => void
}
export class PrivateKeyModal extends Component<Props> {
  render () {
    const { parsedUri, onAccept, onReject } = this.props

    return (
      <View>
        <PrimaryModal parsedUri={parsedUri} onAccept={onAccept} onReject={onReject} />
        <SecondaryModal />
      </View>
    )
  }
}

export default PrivateKeyModal

// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import { NonInteractiveModal } from '../../../../components/Modals'

import { Icon } from '../../../../components/Icon/Icon.ui'
import s from '../../../../../../locales/strings.js'

export type Props = {
  error: Error | null,
  isVisible: boolean,
  isSweeping: boolean,
  onBackButtonPress: () => void,
  onBackdropPress: () => void
}
export class SecondaryModal extends Component<Props> {
  render () {
    const { error, isVisible, onBackButtonPress, onBackdropPress } = this.props

    return (
      <NonInteractiveModal isVisible={isVisible} onBackButtonPress={onBackButtonPress} onBackdropPress={onBackdropPress}>
        <NonInteractiveModal.Icon>
          <Icon style={{}} type={'ionIcons'} name={'ios-key'} size={30} />
        </NonInteractiveModal.Icon>

        <NonInteractiveModal.Footer>
          {error ? (
            <NonInteractiveModal.Message>
              <Text>{error.message}</Text>
            </NonInteractiveModal.Message>
          ) : (
            <View>
              <NonInteractiveModal.Message>
                <Text>{s.strings.private_key_modal_importing_private_key}</Text>
              </NonInteractiveModal.Message>
              <ActivityIndicator size={'large'} style={{ padding: 10 }} />
            </View>
          )}
        </NonInteractiveModal.Footer>
      </NonInteractiveModal>
    )
  }
}

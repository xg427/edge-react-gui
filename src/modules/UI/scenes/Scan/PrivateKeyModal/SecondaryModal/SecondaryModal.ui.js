// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text } from 'react-native'

import { NonInteractiveModal } from '../../../../components/Modals'

import { Icon } from '../../../../components/Icon/Icon.ui'
import s from '../../../../../../locales/strings.js'

export type Props = {
  error: Error | null,
  isVisible: boolean,
  isSweeping: boolean,
  onBackButtonPress: () => void,
  onBackdropPress: () => void,
  onExpire: () => void
}
export class SecondaryModal extends Component<Props> {
  render () {
    const { error, isVisible, onBackButtonPress, onBackdropPress, isSweeping } = this.props

    return (
      <NonInteractiveModal isVisible={isVisible} onBackButtonPress={onBackButtonPress} onBackdropPress={onBackdropPress}>
        <NonInteractiveModal.Icon>
          <Icon style={{}} type={'ionIcons'} name="ios-key" size={30} />
        </NonInteractiveModal.Icon>

        {isSweeping ? (
          <ActivityIndicator />
        ) : (
          <NonInteractiveModal.Message>
            <Text>{error ? error.message : s.strings.private_key_modal_importing_private_key}</Text>
          </NonInteractiveModal.Message>
        )}
      </NonInteractiveModal>
    )
  }
}

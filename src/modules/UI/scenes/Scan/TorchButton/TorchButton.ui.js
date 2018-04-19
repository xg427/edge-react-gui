// @flow

import React, { Component } from 'react'
import { Text, TouchableHighlight } from 'react-native'

import s from '../../../../../locales/strings.js'
import { Icon } from '../../../components/Icon/Icon.ui.js'

export type Props = {
  onPress: () => void
}
export class TorchButton extends Component {
  render () {
    const TORCH_TEXT = s.strings.fragment_send_flash
    const { onPress } = this.props
    return (
      <TouchableHighlight style={styles.bottomButton} onPress={onPress} underlayColor={rawStyles.underlay.color}>
        <View style={styles.bottomButtonTextWrap}>
          <Ionicon style={[styles.flashIcon]} name="ios-flash-outline" size={24} />
          <T style={[styles.flashButtonText, styles.bottomButtonText]}>{TORCH_TEXT}</T>
        </View>
      </TouchableHighlight>
    )
  }
}

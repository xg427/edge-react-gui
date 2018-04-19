// @flow

import React, { Component } from 'react'
import { Text, TouchableHighlight } from 'react-native'

import s from '../../../../../locales/strings.js'
import { Icon } from '../../../components/Icon/Icon.ui.js'

export type Props = {
  onPress: () => void
}
export class ManualInputButton extends Component {
  render () {
    const ADDRESS_TEXT = s.strings.fragment_send_address
    const { onPress } = this.props
    return (
      <TouchableHighlight style={styles.bottomButton} onPress={onPress} underlayColor={rawStyles.underlay.color}>
        <View style={styles.bottomButtonTextWrap}>
          <FAIcon style={[styles.addressBookIcon]} name="address-book-o" size={18} />
          <Text style={[styles.addressButtonText, styles.bottomButtonText]}>{ADDRESS_TEXT}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

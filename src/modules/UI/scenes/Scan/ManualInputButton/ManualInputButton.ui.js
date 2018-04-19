// @flow

import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'

import s from '../../../../../locales/strings.js'
// import { Icon } from '../../../components/Icon/Icon.ui.js'

export type Props = {
  onPress: () => void
}
export class ManualInputButton extends Component<Props> {
  render () {
    const ADDRESS_TEXT = s.strings.fragment_send_address
    const { onPress } = this.props
    return (
      <TouchableHighlight onPress={onPress}>
        <View>
          <FAIcon style={{}} name="address-book-o" size={18} />
          <Text style={{}}>{ADDRESS_TEXT}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

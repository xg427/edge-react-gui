// @flow

import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import Ionicon from 'react-native-vector-icons/FontAwesome'

import s from '../../../../../locales/strings.js'
// import { Icon } from '../../../components/Icon/Icon.ui.js'
import styles from './styles.js'

export type Props = {
  onPress: () => void
}
export class TorchButton extends Component {
  render () {
    const TORCH_TEXT = s.strings.fragment_send_flash
    const { onPress } = this.props
    return (
      <TouchableHighlight onPress={onPress} style={styles.button}>
        <View>
          <Ionicon name="ios-flash-outline" size={24} />
          <Text>{TORCH_TEXT}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

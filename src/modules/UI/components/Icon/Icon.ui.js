// @flow

import React from 'react'
import { StyleSheet } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { ENTYPO, MATERIAL_ICONS, FONT_AWESOME, ION_ICONS, SIMPLE_ICONS, MATERIAL_COMMUNITY, FEATHER_ICONS } from '../../../../constants/indexConstants'

type Props = {
  style: StyleSheet.Styles,
  name: string,
  size: number,
  type: string
}

const Icon = ({ style, name, size, type }: Props) => {
  switch (type) {
    case ENTYPO:
      return <Entypo style={style} name={name} size={size} />
    case MATERIAL_ICONS:
      return <MaterialIcon style={style} name={name} size={size} />
    case FONT_AWESOME:
      return <FAIcon style={style} name={name} size={size} />
    case ION_ICONS:
      return <IonIcon style={style} name={name} size={size} />
    case SIMPLE_ICONS:
      return <SimpleIcon style={style} name={name} size={size} />
    case MATERIAL_COMMUNITY:
      return <MCIcon style={style} name={name} size={size} />
    case FEATHER_ICONS:
      return <FeatherIcon style={style} name={name} size={size} />
  }
  return null
}

export { Icon }

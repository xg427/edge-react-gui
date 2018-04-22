// @flow
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'

import THEME from '../../../../theme/variables/airbitz.js'
import Gradient from '../../components/Gradient/Gradient.ui'

StatusBar.setNetworkActivityIndicatorVisible(true)

type props = {
  style: any,
  children: any
}

// The Gradient Component is a hack to make the upper portion of the safe area view have the edge gradient
const SafeAreaViewComponent = ({ style, children }: props) => {
  return (
    <Gradient style={{ flex: 1, borderColor: 'red', borderWidth: 1 }}>
    <SafeAreaView style={[style, { flex: 1 }]}>
        {children}
      <StatusBar barStyle={'light-content'} transparent networkActivityIndicatorVisible />
    </SafeAreaView>
  </Gradient>
  )
}

export default SafeAreaViewComponent

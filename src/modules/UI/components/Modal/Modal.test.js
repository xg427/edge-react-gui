/* globals jest describe it expect */
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import Modal from './Modal.ui.js'

describe('Modal', () => {
  it('should render', () => {
    const renderer = new ShallowRenderer()

    const props = {
      headerText: 'header text',
      headerTextStyle: {},
      headerSubtext: 'header sub text',
      visibilityBoolean: true,
      featuredIcon: null,
      modalHeaderIcon: {},
      modalVisibleStyle: {},
      modalBoxStyle: {},
      modalContentStyle: {},
      modalBodyStyle: {},
      modalMiddle: null,
      modalMiddleStyle: {},
      modalBottom: null,
      modalBottomStyle: {},
      onExitButtonFxn: jest.fn(),
      style: {}
    }
    const actual = renderer.render(<Modal {...props} />)

    expect(actual).toMatchSnapshot()
  })
})

import React, { Component } from 'react'
import RadioDetail from './RadioDetail'
import RadioTingList from './RadioTingList'
import HotRadio from './Hot_Radio'
class RadioInfo extends Component {
  render () {
    return (
      <div>
        <RadioDetail />
        <RadioTingList />
        <HotRadio />
      </div>
    )
  }
}
export default RadioInfo

import React, { Component } from 'react'
import RadioDetail from './RadioDetail'
import RadioTingList from './RadioTingList'
import HotRadio from './Hot_Radio'
class RadioInfo extends Component {
  componentDidMount () {
    console.log(this.refs.aa.refs.count)
    console.log(this.refs.aa.refs.count.innerHTML)
  }
  render () {
    return (
      <div>
        <RadioDetail ref='aa' />
        <RadioTingList />
        <HotRadio />
      </div>
    )
  }
}
export default RadioInfo

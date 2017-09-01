import React, { Component } from 'react'
import RadioDetail from './RadioDetail'
import RadioTingList from './RadioTingList'
import RadioTingPage from './Page'
class RadioInfo extends Component {
  render () {
    return (
      <div>
        <RadioDetail />
        <RadioTingList />
        <RadioTingPage />
      </div>
    )
  }
}
export default RadioInfo

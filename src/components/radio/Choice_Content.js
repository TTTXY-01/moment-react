import React, {Component} from 'react'
import RadioType from './Radio_type'
import Recommendation from './Recommendation_TING'
import TopTing from './Top_Ting'
import NewVoice from './New_Voice'
import HotRadio from './Hot_Radio'
import RadioCarouse from './Radio_Carouse'
class ChoiceContent extends Component {
  render () {
    return (
      <div className='connect_wrap'>
        <RadioCarouse />
        <RadioType />
        <Recommendation />
        <TopTing />
        <HotRadio />
        <NewVoice />
      </div>
    )
  }
}
export default ChoiceContent

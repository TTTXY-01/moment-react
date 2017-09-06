import React, {Component} from 'react'
import RadioTypeTitle from './Radio_type_title'
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
        <RadioTypeTitle />
        <Recommendation />
        <TopTing />
        <HotRadio />
        <NewVoice />
      </div>
    )
  }
}
export default ChoiceContent

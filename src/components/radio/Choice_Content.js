import React, {Component} from 'react'
import RadioType from './Radio_type'
import Recommendation from './Recommendation_TING'
import TopTing from './Top_Ting'
import NewVoice from './New_Voice'
import HotRadio from './Hot_Radio'
import Slideshow from '../read/Slideshow'
class ChoiceContent extends Component {
  render () {
    return (
      <div className='connect_wrap'>
        <Slideshow />
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

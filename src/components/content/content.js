import React, {Component} from 'react'
import Recommendation from '../recommend/Recommendation_TING'
import TopTing from '../Top_Ting/Top_Ting'
import NewVoice from '../New_Voice/New_Voice'
import HotRadio from '../Hot_Radio/Hot_Radio'
class App extends Component {
  render () {
    return (
      <div className='connect_wrap'>
        <Recommendation />
        <TopTing />
        <HotRadio />
        <NewVoice />
      </div>
    )
  }
}
export default App

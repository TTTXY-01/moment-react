/**
 * Created by dllo on 17/8/30.
 */
import React, {Component} from 'react'
import Header from '../../components/read/Header'
import Timelineinfo from '../../components/timelineinfo/Timelineinfo'
import Footer from '../../components/read/Footer'
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Timelineinfo />
        <Footer />
      </div>
    )
  }
}
export default App

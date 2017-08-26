/**
 * Created by dllo on 17/8/24.
 */

import React, {Component} from 'react'
import Header from '../../components/read/Header'
import Publish from '../../components/fragment/Publish'
import HotLabel from '../../components/fragment/HotLabel'
import AllFragment from '../../components/fragment/AllFragment'
class App extends Component {
  render () {
    return (
      <div id='fragment-container'>
        <Header />
        <Publish />
        <HotLabel />
        <AllFragment />
      </div>
    )
  }
}

export default App
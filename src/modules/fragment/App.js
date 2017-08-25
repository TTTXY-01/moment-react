/**
 * Created by dllo on 17/8/24.
 */

import React, {Component} from 'react'
import Publish from '../../components/fragment/Publish'
import HotLabel from '../../components/fragment/HotLabel'

class App extends Component {
  render () {
    return (
      <div id='container'>
        <Publish />
        <HotLabel />
      </div>
    )
  }
}

export default App
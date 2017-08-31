/**
 * Created by dllo on 17/8/24.
 */

import React, {Component} from 'react'
import Header from '../../components/read/Header'
import Publish from '../../components/fragment/Publish'
import HotLabel from '../../components/fragment/HotLabel'
import AllFragment from '../../components/fragment/AllFragment'
// import Footer from '../../components/read/Footer'
class App extends Component {
  constructor (porps) {
    super(porps)
    this.state = {
      url: '',
      tag: ''
    }
  }

  tagValue = (ev) => {
    console.log(ev.target.getAttribute('name'))
  }

  render () {
    return (
      <div>
        <div id='fragment-container'>
          <Header />
          <Publish />
          <HotLabel tagValue={this.tagValue} />
          <AllFragment />
        </div>
      </div>

    )
  }
}

export default App

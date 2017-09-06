/**
 * Created by dllo on 17/8/24.
 */

import React, {Component} from 'react'
import Header from '../../components/read/Header'
import Publish from '../../components/timeline/Publish'
import HotLabel from '../../components/timeline/HotLabel'
import Footer from '../../components/read/Footer'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tag: '',
      url: '',
      bool: true,
      test: '000',
      url2: ''
    }
  }

  render () {
    return (
      <div>
        <Header />
        <div id='fragment-container'>
          <Publish />
          <HotLabel tagValue={this.tagValue} />
        </div>
        <Footer />
      </div>

    )
  }
}

export default App

/**
 * Created by dllo on 17/9/1.
 */

import React, {Component} from 'react'
import FeedList from '../../components/feedlist/feedlist'
import Header from '../../components/read/Header'
import Footer from '../../components/read/Footer'
class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <FeedList />
        <Footer />
      </div>
    )
  }
}
export default App
/**
 * Created by dllo on 17/8/30.
 */
import React, {Component} from 'react'
import ClientSide from '../../components/clientSide/clientSide'
import Header from '../../components/read/Header'
import Footer from '../../components/read/Footer'
class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <ClientSide />
        <Footer />
      </div>
    )
  }
}

export default App
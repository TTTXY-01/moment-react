import React, {Component} from 'react'
import Header from '../../components/read/Header'
// import ChoiceContent from '../../components/radio/Choice_Content'
import AllRadioContent from '../../components/radio/AllRadio_Content'
import Footer from '../../components/read/Footer'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <AllRadioContent />
        <Footer />
      </div>
    )
  }
}
export default App

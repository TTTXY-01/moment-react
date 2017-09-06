import React, {Component} from 'react'
import Header from '../../components/read/Header'
import ChoiceContent from '../../components/radio/Choice_Content'
import AllRadioContent from '../../components/radio/AllRadio_Content'
import Footer from '../../components/read/Footer'
import Up from '../../components/read/Up'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      All_Choice: true
    }
  }
  // 点击事件
  click = (e) => {
    let spanArr = document.querySelectorAll('.radioType_title>span')
    for (let i = 0; i < spanArr.length; i++) {
      spanArr[i].className = ''
    }
    e.target.className = 'type-active'
    if (e.target.innerHTML === '精选') {
      this.setState({
        All_Choice: true
      })
    } else {
      this.setState({
        All_Choice: false
      })
    }
  }
  render () {
    return (
      <div>
        <Header />
        <div className='radioType_title'>
          <span onClick={this.click} className='type-active'>精选</span>
          <span onClick={this.click}>全部电台</span>
        </div>
        {
          this.state.All_Choice ? <ChoiceContent /> : <AllRadioContent />
        }
        <Footer />
        <Up />
      </div>
    )
  }
}
export default App

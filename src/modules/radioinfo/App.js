/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
// 顶部导航
import Header from '../../components/read/Header'
// 电台详情
import RadioInfo from '../../components/radio/RadioInfo'
// 底部
import Footer from '../../components/read/Footer'
// 点击回到顶部
import Up from '../../components/read/Up'
class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <RadioInfo />
        <Footer />
        <Up />
      </div>
    )
  }
}

export default App

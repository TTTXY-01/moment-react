/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
// 顶部导航
import Header from '../../components/read/Header'
// 六种电台类型
import RadioType from '../../components/radio/RadioType'
// 底部
import Footer from '../../components/read/Footer'
// 点击回到顶部
import Up from '../../components/read/Up'
class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <RadioType />
        <Footer />
        <Up />
      </div>
    )
  }
}

export default App

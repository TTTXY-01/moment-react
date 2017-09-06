/**
 * Created by XiaoTong on 2017/9/2.
 */
import React, {Component} from 'react'
// 顶部导航
import Header from '../../components/read/Header'
// 底部
import Footer from '../../components/read/Footer'
// 中间账号设置
import Setting from '../../components/login/account-setting'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Setting />
        <Footer />
      </div>
    )
  }
}

export default App

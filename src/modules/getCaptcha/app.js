/**
 * Created by XiaoTong on 2017/9/1.
 */
import React, {Component} from 'react'
import Header from '../../components/read/Header'
import Footer from '../../components/read/Footer'
import Captcha from '../../components/login/getCaptcha'
class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Captcha />
        <Footer />
      </div>
    )
  }
}

export default App

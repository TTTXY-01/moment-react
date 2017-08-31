/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
// 顶部导航
import Header from '../../components/read/Header'
// 底部
import Footer from '../../components/read/Footer'
// 点击回到顶部
import Up from '../../components/read/Up'
// 文章列表
import WriteNotes from '../../components/read/WriteNotes'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <WriteNotes />
        <Footer />
        <Up />
      </div>
    )
  }
}

export default App

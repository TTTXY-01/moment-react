import React, {Component} from 'react'
// 顶部导航
import Header from '../../components/read/Header'
// 底部
import Footer from '../../components/read/Footer'
// 点击回到顶部
import Up from '../../components/read/Up'
// 文章详情
import ArticleInfo from '../../components/read/ArticleInfo'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <ArticleInfo />
        <Footer />
        <Up />
      </div>
    )
  }
}

export default App

/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
// 顶部导航
import Header from '../../components/read/Header'
// 轮播图
import Slideshow from '../../components/read/Slideshow'
// 分类
import Classification from '../../components/read/Classification'
// 热门文章
import HotArticles from '../../components/read/HotArticles'
// 底部
import Footer from '../../components/read/Footer'
// 点击回到顶部
import Up from '../../components/read/Up'
class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Slideshow />
        <Classification />
        <HotArticles />
        <Footer />
        <Up />
      </div>
    )
  }
}

export default App

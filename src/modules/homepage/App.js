/**
 * Created by XiaoTong on 2017/8/25.
 */
import React, {Component} from 'react'
// 顶部导航
import Header from '../../components/read/Header'
import Focus from '../../components/homepage/focus'
import Content from '../../components/homepage/content'
import Ting from '../../components/homepage/TING'
import Hot from '../../components/homepage/hot-Pianke'
import MoreBtn from '../../components/homepage/morebtn'
import MoreContent from '../../components/homepage/more-content'
class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Focus />
        <Content />
        <Ting />
        <Hot />
        <MoreBtn />
        <MoreContent />
      </div>
    )
  }
}

export default App

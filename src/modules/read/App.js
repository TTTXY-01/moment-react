/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
// 顶部导航
import Header from '../../components/read/Header'
// 轮播图
import Slideshow from '../../components/read/Slideshow'
class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Slideshow />
      </div>
    )
  }
}

export default App

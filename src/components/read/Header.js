/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'

class Header extends Component {
  click = (e) => {
    let liArr = document.querySelectorAll('#navUL>a>li')
    liArr.forEach((item, index) => {
      item.className = ''
    })
    e.target.className = 'clickLi'
  }
  render () {
    return (
      <div id='nav-fixed'>
        <nav>
          <div id='head'>
            <a href='###' id='logo'><img src={require('../../assets/images/head-logo.png')} /></a>
            <ul id='navUL'>
<<<<<<< HEAD
=======
<<<<<<< HEAD
              <a href="homepage.html"><li className='clickLi' onClick={this.click}>首页</li></a>
              <a href="read.html"><li onClick={this.click}>阅读</li></a>
              <a href="radio.html"><li onClick={this.click}>电台</li></a>
              <a href="timeline.html"><li onClick={this.click}>碎片</li></a>
              <a href="clientSide.html"><li onClick={this.click}>客户端</li></a>
=======
<<<<<<< HEAD
              <a href="###"><li onClick={this.click}>首页</li></a>
              <a href="read.html"><li className='clickLi' onClick={this.click}>阅读</li></a>
              <a href="radio.html"><li onClick={this.click}>电台</li></a>
=======
<<<<<<< HEAD
>>>>>>> 7c9bf24224f7a81761bb04ee732d837623108205
              <a href="###"><li className='clickLi' onClick={this.click}>首页</li></a>
              <a href="read.html"><li onClick={this.click}>阅读</li></a>
              <a href="###"><li className='clickLi' onClick={this.click}>首页</li></a>
              <a href="read.html"><li onClick={this.click}>阅读</li></a>
              <a href="###"><li onClick={this.click}>首页</li></a>
              <a href="read.html"><li className='clickLi' onClick={this.click}>阅读</li></a>
              <a href="###"><li onClick={this.click}>电台</li></a>
>>>>>>> 4691d4fcd9a45b2ed99e769ff1a6877c91bb8e3a
              <a href="###"><li onClick={this.click}>碎片</li></a>
              <a href="###"><li onClick={this.click}>客户端</li></a>
>>>>>>> 21df6dacf30ff9eb107d0b39107c0cb54d8e15c9
            </ul>
            <div id='login'>
              <div id='outside'>
                <div id='inside'><img src={require('../../assets/images/edit-icon.png')} /></div>
              </div>
              <div id='loginBtn'>登录 / 注册</div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
export default Header

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
              <a href='###'><li className='clickLi'>首页</li></a>
              <a href='###'><li>阅读</li></a>
              <a href='###'><li>电台</li></a>
              <a href='###'><li>碎片</li></a>
              <a href='###'><li>客户端</li></a>
=======
              <a href="###"><li onClick={this.click}>首页</li></a>
              <a href="###"><li className='clickLi' onClick={this.click}>阅读</li></a>
              <a href="###"><li onClick={this.click}>电台</li></a>
              <a href="###"><li onClick={this.click}>碎片</li></a>
              <a href="###"><li onClick={this.click}>客户端</li></a>
>>>>>>> b4cc464c4a0b637dc344040a3143cf157acd332f
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

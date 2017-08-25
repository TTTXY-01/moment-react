/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'

class Header extends Component {
  render () {
    return (
      <div id='nav-fixed'>
        <nav>
          <div id='head'>
            <a href='###' id='logo'><img src={require('../../assets/images/head-logo.png')} /></a>
            <ul id='navUL'>
              <a href="###"><li className='clickLi'>首页</li></a>
              <a href="###"><li>阅读</li></a>
              <a href="###"><li>电台</li></a>
              <a href="###"><li>碎片</li></a>
              <a href="###"><li>客户端</li></a>
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

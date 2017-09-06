/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'

class Loginbefore extends Component {
  static propTypes = {
    lgBtn: React.PropTypes.func
  }
  showLogin = () => {
    let theLogin = document.getElementById('theLogin')
    theLogin.style.display = 'block'
  }
  render () {
    return (
      <div id='head'>
        <a href='#' id='logo'><img src={require('../../assets/images/head-logo.png')} /></a>
        <ul id='navUL'>
          <a href="homepage.html"><li className='clickLi'>首页</li></a>
          <a href="read.html"><li>阅读</li></a>
          <a href="radio.html"><li>电台</li></a>
          <a href="timeline.html"><li>碎片</li></a>
          <a href="clientSide.html"><li>客户端</li></a>
        </ul>
        <div id='login'>
          <div id='outside' onClick={this.showLogin}>
            <div id='inside'><img src={require('../../assets/images/edit-icon.png')} /></div>
          </div>
          <div id='loginBtn' onClick={this.props.lgBtn}>登录&nbsp;/&nbsp;注册</div>
        </div>
      </div>
    )
  }
}
export default Loginbefore

/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'

class Loginafter extends Component {
  static propTypes = {
    logout: React.PropTypes.func,
    data: React.PropTypes.object
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
          <a href="feedlist.html"><li>动态</li></a>
          <a href="clientSide.html"><li>客户端</li></a>
        </ul>
        <div id='login'>
          <a href={'/editor/#!/?uid=' + this.props.data.uid} target='_blank'>
            <div id='outside'>
              <div id='inside'><img src={require('../../assets/images/edit-icon.png')} /></div>
            </div>
          </a>
          <div className="msg-icon">
            <img src={require('../../assets/images/msg.png')} alt="" />
            <ul>
              <li><a href="###">评论<span>0</span></a></li>
              <li><a href="###">喜欢<span>0</span></a></li>
              <li><a href="###">粉丝<span>0</span></a></li>
              <li><a href="###">片邮<span>0</span></a></li>
            </ul>
          </div>
          <div className='userinfo'>
            <a href={'user.html?uid=' + this.props.data.uid}>
              <img src={this.props.data.icon} alt="" />
            </a>
            <ul>
              <li><a href='userSet.html'>账号设置</a></li>
              <li onClick={this.props.logout}><a href="###">退出</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Loginafter

/**
 * Created by XiaoTong on 2017/8/30.
 */
import React, {Component} from 'react'
import '../../assets/styles/login.styl'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLogin: 'block',
      phone: 'none'
    }
  }
  static propTypes = {
    display: React.PropTypes.string,
    closeBtn: React.PropTypes.func,
    loginBtn: React.PropTypes.func
  }
  cutBtn = () => {
    let span = document.querySelectorAll('.type-title-cpt>span')
    span[1].className = 'login-active'
    span[0].className = ''
    this.setState({
      showLogin: 'none',
      phone: 'block'
    })
  }
  lgBtn = () => {
    let span = document.querySelectorAll('.type-title-cpt>span')
    span[0].className = 'login-active'
    span[1].className = ''
    this.setState({
      showLogin: 'block',
      phone: 'none'
    })
  }
  componentDidMount () {
    // this.ajaxData('')
  }
  render () {
    return (
      <div>
        <div id="theLogin" style={{display: this.props.display}}>
          <div className="close-login-box" onClick={this.props.closeBtn}>&nbsp;</div>
          <div className="login-box">
            <div className="pianke-text">世界很美,你正好有空</div>
            <div className="type-title-cpt">
              <span className="login-active" onClick={this.lgBtn}>登录</span>
              <span onClick={this.cutBtn}>注册</span>
            </div>
            <div className="login-content" style={{display: this.state.showLogin}}>
              <div className="login-warn">请输入账号或密码</div>
              <div className="login-input">
                <input type="text" className='login-mobile' placeholder="输入邮箱或手机号码" />
              </div>
              <div className="login-input">
                <input type="password" className='login-password' placeholder="密码" />
              </div>
              <div className="forget-psw">
                <a className="forget-a" href="###" target='_blank'>忘记密码?</a>
              </div>
              <div className="login-btn" onClick={this.props.loginBtn}>登录</div>
            </div>
            <div className="register-content" style={{display: this.state.phone}}>
              <img className="content-weCha" src="http://qnstatic.pianke.me/public/assets/img/pianke-code.png" />
            </div>
            <div className="login-others-way">
              <div>社区账号登录:</div>
              <div className="share-cpt">
                <a className="share-a" href="https://api.weibo.com/oauth2/authorize?client_id=2069323349&redirect_uri=http%3A%2F%2Fpianke.me%2Fpages%2Findex%2Findex.html&response_type=code">
                  <div className="share-sina">&nbsp;</div>
                </a>
                <a className="share-a" href="http://open.weixin.qq.com/connect/qrconnect?appid=wx7a61c139983cfaf6&redirect_uri=http%3A%2F%2Fpianke.me%2Fpages%2Findex%2Findex.html&response_type=code&scope=snsapi_login#wechat_redirect">
                  <div className="share-wechat">&nbsp;</div>
                </a>
                <a className="share-a" href="https://graph.qq.com/oauth/show?which=Login&display=pc&response_type=code&client_id=100339551&redirect_uri=http%3A%2F%2Fpianke.me%2Fpages%2Findex%2Findex.html&state=d897de4f97dfe86e9e05fe81259d1d6c&scope=get_user_info,add_share,list_album,add_album,upload_pic,add_topic,add_one_blog,add_t,check_page_fans,get_fanslist,notify_tasksys,add_idol,get_info">
                  <div className="share-qq">&nbsp;</div>
                </a>
                <a className="share-a" href="https://www.douban.com/service/auth2/auth?client_id=0a8220efeaf718b31f8662cfc0e54a19&redirect_uri=http%3A%2F%2Fpianke.me&response_type=code&scope=douban_basic_common">
                  <div className="share-dou">&nbsp;</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
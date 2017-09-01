/**
 * Created by XiaoTong on 2017/8/30.
 */
import React, {Component} from 'react'
import '../../assets/styles/login.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Login extends Component {
  closeBtn = () => {
    this.setState({
      display: 'none'
    })
  }
  cutBtn = () => {
    this.setState({
      showLogin: 'none',
      phone: 'block'
    })
  }
  lgBtn = () => {
    this.setState({
      showLogin: 'block',
      phone: 'none'
    })
  }

  ajaxData = (interFace) => {
    const time = new Date()
    // 2.根据当前时间, 进行格式化 yyyymmddHHMMss
    const timestamp = dateformat(time.getTime(), 'yyyymmddHHMMss')
    // 3.将字符串 0+''+timestamp 转成MD5, 并变为全大写
    const sig = md5('0' + '' + timestamp).toUpperCase()
    const Authorization = base64.btoa('' + ':' + timestamp)
    const url = '/api' + interFace + '&sig=' + sig
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: Authorization
      }
    })
      .then(response => {
        return response.json()
      })
      .then(response => {
        this.setState({
          data: response.data
        })
      })
  }

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      display: 'block',
      showLogin: 'block',
      phone: 'none'
    }
  }

  componentDidMount () {
    this.ajaxData('/headline/recent.php?location=special')
  }

  render () {
    return (
      <div>
        <div id="theLogin" style={{display: this.state.display}}>
          <div className="close-login-box" onClick={this.closeBtn}>&nbsp;</div>
          <div className="login-box">
            <div className="pianke-text">世界很美,你正好有空</div>
            <div className="type-title-cpt">
              <span className="active" onClick={this.lgBtn}>登录</span>
              <span className="active2" onClick={this.cutBtn}>注册</span>
            </div>
            <div className="login-content" style={{display: this.state.showLogin}}>
              <div className="login-warn">请输入账号或密码</div>
              <div className="login-input">
                <input type="text" placeholder="输入邮箱或手机号码" />
              </div>
              <div className="login-input">
                <input type="password" placeholder="密码" />
              </div>
              <div className="forget-psw">
                <a className="forget-a" href="###">忘记密码?</a>
              </div>
              <div className="login-btn">登录</div>
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
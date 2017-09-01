/**
 * Created by XiaoTong on 2017/9/1.
 */
import React, {Component} from 'react'
import '../../assets/styles/getCaptcha.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Captcha extends Component {
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
      data: []
    }
  }

  componentDidMount () {
    this.ajaxData('/headline/recent.php?location=special')
  }

  render () {
    return (
      <div className="container">
        <div className="set-cpt">
          <div className="set-title">找回密码</div>
          <div className="login-input">
            <input type="text" maxLength="11" placeholder="请输入手机号" />
          </div>
          <div className="btn">发送验证码</div>
        </div>

      </div>
    )
  }
}
export default Captcha
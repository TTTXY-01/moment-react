/**
 * Created by XiaoTong on 2017/9/1.
 */
import React, {Component} from 'react'
import '../../assets/styles/getCaptcha.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Captcha extends Component {
  forgetBtn = () => {
    let mobile = document.querySelector('.login-input>input').value
    this.ajaxData('/user/captcha.php?type=1&mobile=' + mobile)
    this.setState({
      display: 'none',
      back: 'block'
    })
  }
  recomposeBtn = () => {
    let phone = document.querySelectorAll('.login-input>input')[0].value
    let password = document.querySelectorAll('.login-input>input')[1].value
    let code = document.querySelectorAll('.login-input>input')[2].value
    console.log(phone)
    console.log(password)
    console.log(code)
    let parameter = '/user/forgotPass.php?pwd=' + password + '&mobile=' + phone + '&captcha=' + code
    this.ajaxData(parameter)
    document.querySelectorAll('.forget-btn')[1].innerHTML = '修改成功'
    window.history.back()
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
        console.log(response)
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

  componentDidUpdate () {
    // if (this.prototype.code === 1) {
      // window.history.back()
    // }
  }

  render () {
    return (
      <div id="bigD">
        <div className="container">
          <div className="set-cpt" style={{display: this.state.display}}>
            <div className="set-title">找回密码</div>
            <div className="login-input">
              <input type="text" maxLength="11" placeholder="请输入手机号" />
            </div>
            <div className="forget-btn" onClick={this.forgetBtn}>发送验证码</div>
          </div>
          <div className="alter-cpt" style={{display: this.state.back}}>
            <div className="set-title">重设密码</div>
            <div className="login-input">
              <input type="text" maxLength="11" placeholder="手机号" />
            </div>
            <div className="login-input">
              <input type="password" placeholder="新密码" />
            </div>
            <div className="login-input">
              <input type="text" placeholder="验证码" />
            </div>
            <div className="forget-btn" onClick={this.recomposeBtn}>完成</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Captcha
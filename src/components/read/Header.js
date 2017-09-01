/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
import Login from '../../components/login/login'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      display: 'none'
    }
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
        console.log(response.data)
        this.setState({
          data: response.data
        })
      })
  }
  componentDidMount () {
    // console.log(location.href.match(/\/[a-zA-Z]+\.html/g)[0])
    let liArr = document.querySelectorAll('#navUL>a>li')
    liArr.forEach((item, index) => {
      item.className = ''
    })
    switch (location.href.match(/\/[a-zA-Z]+\.html/g)[0]) {
      case '/homepage.html': liArr[0].className = 'clickLi'
        break
      case '/read.html': liArr[1].className = 'clickLi'
        break
      case '/radio.html': liArr[2].className = 'clickLi'
        break
      case '/timeline.html': liArr[3].className = 'clickLi'
        break
      case '/clientSide.html': liArr[4].className = 'clickLi'
        break
    }
  }
  lgBtn = () => {
    this.setState({
      display: 'block'
    })
  }
  closeBtn = () => {
    this.setState({
      display: 'none'
    })
  }
  // 登录事件
  loginBtn = () => {
    let mobile = document.querySelector('.login-mobile').value
    let password = document.querySelector('.login-password').value
    let interFace = '/user/login.php?mobile=' + mobile + '&pwd=' + password
    this.ajaxData(interFace)
  }
  render () {
    return (
      <div id='nav-fixed'>
        <nav>
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
              <div id='outside'>
                <div id='inside'><img src={require('../../assets/images/edit-icon.png')} /></div>
              </div>
              <div id='loginBtn' onClick={this.lgBtn}>登录&nbsp;/&nbsp;注册</div>
            </div>
          </div>
        </nav>
        <Login display={this.state.display} loginBtn={this.loginBtn} closeBtn={this.closeBtn} />
      </div>
    )
  }
}
export default Header

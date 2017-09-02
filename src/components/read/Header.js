/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
import Login from '../../components/login/login'
import Loginafter from '../../components/login/Loginafter'
import Loginbefore from '../../components/login/Loginbefore'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      response: {},
      code: 1
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
        // console.log(response.data)
        this.setState({
          data: response.data,
          response: response,
          code: response.code
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
      case '/clientSide.html': liArr[liArr.length - 1].className = 'clickLi'
        break
      case '/feedlist.html': liArr[4].className = 'clickLi'
        break
    }
  }
  // 传到子组件登录之前的登录点击事件
  lgBtn = () => {
    let theLogin = document.getElementById('theLogin')
    theLogin.style.display = 'block'
  }
  closeBtn = () => {
    let theLogin = document.getElementById('theLogin')
    theLogin.style.display = 'none'
  }
  // 传到子组件的登录事件
  loginBtn = () => {
    let mobile = document.querySelector('.login-mobile').value
    let password = document.querySelector('.login-password').value
    let interFace = '/user/login.php?mobile=' + mobile + '&pwd=' + password
    console.log(interFace)
    this.ajaxData(interFace)
  }
  componentDidUpdate() {
    let theLogin = document.getElementById('theLogin')
    if (this.state.response.code === 0) {
      theLogin.style.display = 'none'
    }
  }
  render () {
    return (
      <div id='nav-fixed'>
        <nav>
          <div id='head'>
            <a href='###' id='logo'><img src={require('../../assets/images/head-logo.png')} /></a>
            <ul id='navUL'>
              <a href="homepage.html"><li className='clickLi' onClick={this.click}>首页</li></a>
              <a href="read.html"><li onClick={this.click}>阅读</li></a>
              <a href="radio.html"><li onClick={this.click}>电台</li></a>
              <a href="timeline.html"><li onClick={this.click}>碎片</li></a>
              <a href="clientSide.html"><li onClick={this.click}>客户端</li></a>
            </ul>
            <div id='login'>
              <div id='outside'>
                <div id='inside'><img src={require('../../assets/images/edit-icon.png')} /></div>
              </div>
              <div id='loginBtn'>登录 / 注册</div>
            </div>
          </div>
          {
            this.state.code === 0 ? <Loginafter uid={this.state.data.uid} /> : <Loginbefore lgBtn={this.lgBtn} />
          }
        </nav>
        <Login message={this.state.response.errorMsg} loginBtn={this.loginBtn} closeBtn={this.closeBtn} />
      </div>
    )
  }
}
export default Header

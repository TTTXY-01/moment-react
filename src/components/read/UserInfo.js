/**
 * Created by dllo on 17/8/29.
 */
import React, {Component} from 'react'
import UserAll from './UserAll'
import UserArticle from './UserArticle'
import UserFragment from './UserFragment'
import UserTing from './UserTing'
import Fans from './Fans'
import Stars from './Stars'
import Visitor from './Visitor'

const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class UserInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      userinfo: {},
      countInfo: {},
      home: 'block',
      like: 'none',
      userInfo: '全部'
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
          userinfo: response.data.userinfo,
          countInfo: response.data.countInfo
        })
      })
  }
  // 分类状态切换点击事件
  click = (e) => {
    let dataTitle = document.querySelectorAll('.data-title>span>a')
    for (let i = 0; i < dataTitle.length; i++) {
      dataTitle[i].className = ''
    }
    e.target.className = 'title-active'
    this.setState({
      userInfo: e.target.innerHTML
    })
  }
  // 粉丝关注访客切换状态的点击事件
  changeSatus = (e) => {
    // console.log(e.target.textContent.match(/[\u4E00-\u9FA5]+/g))
    let text = e.target.textContent.match(/[\u4E00-\u9FA5]+/g)[0]
    this.setState({
      home: 'none',
      like: 'block',
      userInfo: text
    })
    let dataTitle = document.querySelectorAll('.data-title-like>span>a')
    for (let i = 0; i < dataTitle.length; i++) {
      if (dataTitle[i].innerHTML === text) {
        dataTitle[i].className = 'title-active'
      } else {
        dataTitle[i].className = ''
      }
    }
  }
  componentDidMount () {
    this.ajaxData('/space/info.php' + location.search)
  }
  render () {
    var element = null
    switch (this.state.userInfo) {
      case '全部':
        element = <UserAll />
        break
      case '文章':
        element = <UserArticle />
        break
      case '碎片':
        element = <UserFragment />
        break
      case 'Ting':
        element = <UserTing />
        break
      case '粉丝':
        element = <Fans />
        break
      case '关注':
        element = <Stars />
        break
      case '访客':
        element = <Visitor spaceid={this.state.data.spaceid} />
        break
    }
    return (
      <div>
        <div className='user-base-content'>
          <div className='user-info-box'>
            <div className='user-icon-group'>
              <div className='user-icon'>
                <img src={this.state.userinfo.icon} alt="" />
              </div>
            </div>
            <div className='user-info'>
              <div className='user-name'>
                <span>{this.state.userinfo.uname}</span>
                <span className='btn-focus'>关注</span>
                <span className='pianke-mail' />
              </div>
              <div className='user-des'>{this.state.userinfo.desc}</div>
              <div className='user-others'>
                <a href="###" onClick={this.changeSatus}>{this.state.countInfo.fans}<br /><span>粉丝</span></a>
                <a href="###" onClick={this.changeSatus}>{this.state.countInfo.stars}<br /><span>关注</span></a>
                <a href="###" onClick={this.changeSatus}>{this.state.countInfo.visitors}<br /><span>访客</span></a>
              </div>
            </div>
          </div>
        </div>
        <div className='data-title data-title-home' style={{display: this.state.home}}>
          <span><a href="###" onClick={this.click} className='title-active'>全部</a>({this.state.countInfo.articles + this.state.countInfo.timelines + this.state.countInfo.tings})</span>
          <span><a href="###" onClick={this.click}>文章</a>({this.state.countInfo.articles})</span>
          <span><a href="###" onClick={this.click}>碎片</a>({this.state.countInfo.timelines})</span>
          <span><a href="###" onClick={this.click}>Ting</a>({this.state.countInfo.tings})</span>
        </div>
        <div className='data-title data-title-like' style={{display: this.state.like}}>
          <span><a href="###" onClick={this.click} className='title-active'>粉丝</a></span>
          <span><a href="###" onClick={this.click}>关注</a></span>
          <span><a href="###" onClick={this.click}>访客</a></span>
        </div>
        <div className='data-content'>
          {element}
          <img src={require('../../assets/images/download.gif')} alt="" />
        </div>
      </div>
    )
  }
}

export default UserInfo
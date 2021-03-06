import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')
class AllRadioContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pageNum: 1
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
        this.setState({
          data: this.state.data.concat(response.data)
        })
      })
  }
  componentDidMount () {
    this.ajaxData('/ting/listOfRadio.php?pageSize=12&sort=2&pageNum=' + this.state.pageNum)
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll = () => {
    // 滚轮滚动过的距离
    let STop = document.body.scrollTop
    // 屏幕高度
    const DHeight = document.documentElement.clientHeight
    // 网页页面的高度
    const SHeight = document.documentElement.scrollHeight
    if (SHeight === STop + DHeight) {
      this.setState({
        pageNum: this.state.pageNum + 1
      }, () => {
        this.ajaxData('/ting/listOfRadio.php?pageSize=9&sort=2&pageNum=' + this.state.pageNum)
      })
    }
  }

  render () {
    let hotArray = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className="All_radio">
          <a href={'radioinfo.html?id=' + item.id} target='blank'>
            <div className="hot_img_wrap">
              <img src={item.userimg} className="hot_img1" />
              <img src={item.userimg} className="hot_img2" />
              <img src={item.userimg} className="hot_img3" />
              <div className="hot_coverDiv" />
              <p className="hot_coverDiv_title">{item.desc}</p>
            </div>
          </a>
          <div className="hot_radio_introduce">
            <p><a href={'radioinfo.html?id=' + item.id} target='blank' className="hot_radio_name">{item.title}</a></p>
            <p><a href={'user.html?uid=' + item.userinfo.uid} target='blank' className="hot_radio_anchor">主播/{item.userinfo.uname}</a></p>
            <p className="hot_radio_playCount">2.5m次播放</p>
          </div>
        </div>
      )
    })
    return (
      <div className="All_wrap">
        <div className='AllRadioType_title_wrap'>
          <div className='AllRadioType_title'>
            分类:
            <a href={'radioType.html?style=2'} target='blank'>故事</a>
            <a href={'radioType.html?style=4'} target='blank'>音乐</a>
            <a href={'radioType.html?style=6'} target='blank'>读诗</a>
            <a href={'radioType.html?style=5'} target='blank'>电影</a>
            <a href={'radioType.html?style=3'} target='blank'>旅行</a>
            <a href={'radioType.html?style=1'} target='blank'>爱情</a>
          </div>
        </div>
        {hotArray}
      </div>
    )
  }
}
export default AllRadioContent

import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')
class HotRadio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
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
          data: response.data
        })
      })
  }
  componentDidMount () {
    this.ajaxData('/ting/listOfRadio.php?pageSize=3&sort=2&pageNum=1')
  }
  render() {
    let hotArray = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className="hot_radio">
          <div className="hot_img_wrap">
            <img src={item.userimg} className="hot_img1" />
            <img src={item.userimg} className="hot_img2" />
            <img src={item.userimg} className="hot_img3" />
            <div className="hot_coverDiv" />
            <p className="hot_coverDiv_title">{item.desc}</p>
          </div>
          <div className="hot_radio_introduce">
            <p><a href="###" className="hot_radio_name">{item.title}</a></p>
            <p><a href="###" className="hot_radio_anchor">主播/{item.userinfo.uname}</a></p>
            <p className="hot_radio_playCount">2.5m次播放</p>
          </div>
        </div>
      )
    })
    return (
      <div className="hot_wrap">
        <div className="hot_title">
          <span>热门电台 | Hot Radio</span>
        </div>
        <div className="hot_radio_wrap">
          {hotArray}
        </div>
      </div>
    )
  }
}
export default HotRadio
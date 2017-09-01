import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')
class RadioDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      userInfo: {}
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
          data: response.data,
          userInfo: response.data.userinfo
        })
      })
  }
  componentDidMount () {
    let radioid = location.search.split('=')
    console.log(radioid[1])
    this.ajaxData('/ting/radio.php?radioid=' + radioid[1])
  }
  render() {
    return (
      <div className="radio_wrap">
        <div className="radio_detail">
          <div className="radio_img_wrap">
            <img src={this.state.data.userimg} className="hot_img1" />
            <img src={this.state.data.userimg} className="hot_img2" />
            <img src={this.state.data.userimg} className="hot_img3" />
          </div>
          <div className="radio_detail_information">
            <p className="radio_detail_title">{this.state.data.title}</p>
            <div className="radio_detail_author">
              <a href="###">
                <img src={this.state.userInfo.icon} />
              </a>
              <span className="radio_detail_author_title"><a href="###">{this.state.userInfo.uname}</a></span>
              <span className="radio_detail_others">{(this.state.data.plays / 1000000).toFixed(1)}m次播放 | {this.state.data.total}个TING</span>
            </div>
            <div className="radio_detail_introduction">{this.state.data.desc}</div>
            <div className="radio_detail_btn">
              <div className="radio_detail_stopBtn">
                暂停电台
              </div>
              <div className="radio_detail_playBtn">
                播放全部
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default RadioDetail
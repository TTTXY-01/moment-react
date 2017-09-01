import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')
class TingInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      userInfo: {},
      authorInfo: {},
      text: ''
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
          userInfo: response.data.userinfo,
          authorInfo: response.data.authorinfo,
          text: response.data.text
        })
      })
  }
  componentDidMount () {
    console.log(location.search)
    this.ajaxData('/ting/info.php' + location.search)
  }
  render() {
    return (
      <div className="info_wrap">
        <div className="info_detail">
          <div className="info_detail_img">
            <img src={this.state.data.imgUrl} />
          </div>
          <div className="info_detail_information">
            <p className="info_detail_title">{this.state.data.title}</p>
            <div className="info_detail_type">
              <span>1次播放 |</span>
              <span> 评论:1 | </span>
              <span> 喜欢:1</span>
            </div>
            <p className="info_detail_anchor">主播: <a href="###">{this.state.userInfo.uname}</a></p>
            <p className="info_detail_author">原文: <a href="###">{this.state.authorInfo.uname}</a></p>
            <div className="info_detail_btn">
              <div className="info_detail_stopBtn">
                暂停Ting
              </div>
              <div className="info_detail_playBtn">
                播放Ting
              </div>
            </div>
            <div className="info_detail_like" />
            <div className="info_detail_share">
              <div className="info_detail_shareBox">
                <div className="info_detail_shareBox_wrap">
                  <div className="info_detail_shareSina" />
                  <div className="info_detail_shareWechat">
                    <p className="info_detail_shareCode" />
                  </div>
                  <div className="info_detail_shareQzone" />
                  <div className="info_detail_shareDou" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="info_text">
          <div className="info_text_title">
            原文
          </div>
          <div className="info_text_content">
            {this.state.text.substring(0, 190)}...
            <span className="view_all"><a href="###">
              VIEW ALL
              <img src={require('../../assets/images/viewall.png')} />
            </a></span>
          </div>
        </div>
      </div>
    )
  }
}
export default TingInfo
import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')
class RadioTingList extends Component {
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
    let radioid = location.search.split('=')
    console.log(radioid[1])
    this.ajaxData('/ting/listByRadio.php?radioid=' + radioid[1] + '&pageSize=10&pageNum=1')
  }
  timeStr = (nS) => {
    let ymd = new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 8).replace(/\//g, '-')
    return ymd
  }
  render() {
    let listByRadioArray = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className="ting_item">
          <div className="ting_item_index">
            {index + 1}
          </div>
          <div className="ting_item_title">
            {item.title}
          </div>
          <div className="ting_item_like" />
          <div className="ting_item_share">
            <div className="ting_item_shareBox">
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
          <div className="ting_item_right">
            <span className="ting_item_plays">{(item.plays / 1000).toFixed(1)}K次播放</span>
            <span className="ting_item_time">{this.timeStr(item.addtime)}</span>
          </div>
        </div>
      )
    })
    return (
      <div className="radio_detail_ting">
        <div className="info_text_title">
          TING | 617首
        </div>
        <div className="radio_detail_ting_wrap">
          {listByRadioArray}
        </div>
      </div>
    )
  }
}
export default RadioTingList

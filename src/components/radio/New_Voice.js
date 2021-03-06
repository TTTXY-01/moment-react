import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')
class NewVoice extends Component {
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
    this.ajaxData('/ting/list.php?pageSize=3&sort=1')
  }

  render () {
    let Array = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className="recommend_ting">
          <a href={'tingInfo.html?tingid=' + item.tingid} target='blank'>
            <div className="recommend_img_wrap">
              <img src={item.imgUrl} className="recommend_img" />
              <div className="coverDiv" />
            </div>
          </a>
          <div className="recommend_ting_introduce">
            <a href={'tingInfo.html?tingid=' + item.tingid} target='blank'><p className="recommend_ting_name">{item.title}</p></a>
            <a href={'user.html?uid=' + item.userinfo.uid} target='blank'><p className="recommend_ting_anchor">主播/{item.userinfo.uname}</p></a>
            <span>{(item.plays / 1000).toFixed(1)}次播放 |</span>
            <span> 评论:{item.comments} | </span>
            <span> 喜欢:{item.likes}</span>
          </div>
        </div>
      )
    })
    return (
      <div className="new_wrap">
        <div className="recommend_title">
          <span >最新发声 | New Voice</span>
        </div>
        <div className="recommend_ting_wrap">
          {Array}
        </div>
      </div>
    )
  }
}

export default NewVoice

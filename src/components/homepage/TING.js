/**
 * Created by XiaoTong on 2017/8/28.
 */
import React, {Component} from 'react'
import '../../assets/styles/focus.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Ting extends Component {
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
        console.log(response.data[5].data)
        this.setState({
          data: response.data[5].data
        })
      })
  }

  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    var now = new Date()
    var time = now.getFullYear() + '-' + ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1) + '-' + (now.getDate() < 10 ? '0' : '') + now.getDate()
    this.ajaxData('/headline/day.php?time=' + time + '&mode=day')
  }

  render () {
    return (
      <div id="ting-list-group">
        <div id="title-cpt">
          <div className="title-black">1</div>
          <span className="title-ting">TING</span>
        </div>
        <div id="ting-list">
          {
            this.state.data.map((item, index) => {
              return (
                <div className={'ting-cpt' + index} key={index.toString()}>
                  <div className="ting-img-div">
                    <a className="ting-a" href="###">
                      <img className="ting-img" src={item.cover} />
                      <span className="meng-span">&nbsp;</span>
                    </a>
                  </div>
                  <div className="ting-info">
                    <div className="ting-title">
                      <a className="ting-title-a" href="###">{item.detail.shareinfo.title}</a>
                    </div>
                    <div className="ting-author">
                      <a className="ting-author-a" href={'user.html?uid=' + item.detail.userinfo.uid} target="_blank">主播&nbsp;/&nbsp;{item.detail.userinfo.uname}</a>
                    </div>
                    <div className="ting-others">{item.statistics.view}次阅读&nbsp;&nbsp;|&nbsp;&nbsp;评论: {item.statistics.comment}&nbsp;&nbsp;|&nbsp;&nbsp;喜欢: {item.statistics.like}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Ting
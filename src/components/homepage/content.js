/**
 * Created by XiaoTong on 2017/8/26.
 */
import React, {Component} from 'react'
import '../../assets/styles/focus.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Content extends Component {
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
        // console.log(response.data[2].data)
        this.setState({
          data: response.data[2].data
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
      <div id="article-list-group">
        <div id="title-cpt">
          <div className="title-black">1</div>
          <span className="title-read">阅读&nbsp;|&nbsp;Read</span>
        </div>
        {
          this.state.data.map((item, index) => {
            return (
              <div id={'article-cpl' + index} key={index.toString()}>
                <div className={'article-info'}>
                  <div className="article-img">
                    <a className="crticle-img-a" href={'articleInfo.html?contentid=' + item.contentid} target="_blank">
                      <img className={'img-article'} src={item.cover} />
                    </a>
                  </div>
                  <div className={'article-info-box'}>
                    <div className={'article-title'}>
                      <a className="article-a" href={'articleInfo.html?contentid=' + item.contentid} target="_blank">{item.title}</a>
                    </div>
                    <div className={'article-author'}>
                      <a className="author-a" href={'user.html?uid=' + item.detail.userinfo.uid} target="_blank">{'by/' + item.detail.userinfo.uname}</a>
                      <p className="article-p">——</p>
                    </div>
                    <div className="article-content">{item.summary}<a className="view" href={'articleInfo.html?contentid=' + item.contentid} target="_blank">VIEW ALL▶</a></div>
                  </div>
                  <div className="article-others">{item.statistics.view}次阅读&nbsp;&nbsp;|&nbsp;&nbsp;
                    评论: {item.statistics.comment}&nbsp;&nbsp;|&nbsp;&nbsp;喜欢: {item.statistics.like}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Content
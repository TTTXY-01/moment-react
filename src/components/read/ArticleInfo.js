/**
 * Created by dllo on 17/8/28.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class ArticleInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      userinfo: {},
      html: []
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
          html: response.data.html.match(/<p>[\S\s]+<\/p>/g)
        })
      })
  }
  // 时间戳转换
  timeStr = (nS) => {
    let ymd = new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10).replace(/\//g, '-')
    let hm = new Date(parseInt(nS) * 1000).toString().substr(16, 5)
    return ymd + hm
  }
  componentDidMount() {
    // console.log(location.search)
    this.ajaxData('/article/info.php' + location.search)
  }
  componentDidUpdate() {
    let content = document.querySelector('.article-content')
    content.innerHTML = this.state.html
  }
  render () {
    return (
      <div className='article-info-content'>
        <div className='article-info'>
          <div className='article-header-info'>
            <div className='article-type'>
              <a href="readNote.html" target='_blank'>自由写作</a>
            </div>
            <div className='article-title'>{this.state.data.title}</div>
            <div className='article-others'>
              <a href="###" target='_blank'>
                <img src={this.state.userinfo.icon} alt="" />
                {this.state.userinfo.uname}
              </a>
              <span>{this.timeStr(this.state.data.addtime)}&nbsp;&nbsp;|&nbsp;&nbsp;阅读时间:&nbsp;{this.state.data.mins}min&nbsp;&nbsp;|&nbsp;&nbsp;阅读次数:&nbsp;{this.state.data.views}</span>
            </div>
          </div>
          <div className='article-content'>&nbsp;</div>
          <div className='article-report'>
            <div className='article-warn'>
              *此文章为原创作品，非商业使用转载务必保留本文地址及原作者，商业使用请联系
              <a href='http://pianke.me/public/contact.php' target='_blank'>片刻网</a>。
            </div>
            <span className='report'>举报</span>
          </div>
        </div>
        <div className='article-handle'>
          <div className='like-cpt'>{this.state.data.likes}</div>
          <div className='share-cpt'>
            <div className='share-sina'>&nbsp;</div>
            <div className='share-wechat'>
              <div className='ewcode'><img src={require('../../assets/images/pianke-code.png')} alt="" /></div>
            </div>
            <div className='share-qzone'>&nbsp;</div>
            <div className='share-dou'>&nbsp;</div>
          </div>
        </div>
        <div className='is-login-cpt'>
          <div className='is-login'>
            <textarea name='' id='' maxLength='360' placeholder='发表你的精彩评论啦' />
            <div className='btn'>发表评论</div>
          </div>
        </div>
        <div className='article-comment'>
          <div className='comment-title-cpt'>
            <div>评论<span>({this.state.data.comments}&nbsp;条)</span></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleInfo
/**
 * Created by dllo on 17/8/31.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class CommentList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      click: true
    }
  }
  // 定义父级类型
  static propTypes = {
    id: React.PropTypes.string
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
        // console.log(this.state.data)
      })
  }
  // 继承父级所传过来的状态
  componentWillReceiveProps (nextProps) {
    this.setState({
      data: []
    }, () => {
      this.ajaxData('comment/list.php?contentid=' + nextProps.id + '&isAll=1&minId=')
    })
  }
  componentDidMount () {
    this.ajaxData('comment/list.php?contentid=' + this.props.id + '&isAll=1&minId=')
  }
  timeStr = (nS) => {
    let ymd = new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10).replace(/\//g, '-')
    let hm = new Date(parseInt(nS) * 1000).toString().substr(16, 5)
    return ymd + hm
  }
  // 回复框显示
  click = (ev) => {
    if (this.state.click) {
      // console.log(this.state.click)
      ev.target.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.style.display = 'block'
    } else {
      ev.target.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.style.display = 'none'
    }
    this.setState({
      click: !this.state.click
    })
  }
  // 点击取消
  displayClick = (ev) => {
    ev.target.parentNode.parentNode.style.display = 'none'
    this.setState({
      click: true
    })
  }
  // 查看更多
  moreSee = (ev) => {
    ev.target.style.display = 'none'
    ev.target.nextElementSibling.style.display = 'block'
  }
  render () {
    let commentArray = []
    if (this.state.data.length === 0) {
      commentArray = <div className='none-comment'><p>暂时没有评论，快和小伙伴互动吧</p></div>
    } else {
      commentArray = this.state.data.map((item, index) => {
        const uname = '回复' + item.userinfo.uname + ':'
        return (
          <div key={index.toString()} className='content-every clear-float'>
            <div className='comment-user-icon float-left'>
              <a target="_blank" href={'user.html?uid=' + item.userinfo.uid}><img src={item.userinfo.icon} /></a>
            </div>
            <div className="float-right comment-user-content">
              <div className='user-content-header  clear-float'>
                <div className="float-left">
                  <a className='username' target="_blank" href={'user.html?uid=' + item.userinfo.uid}> {item.userinfo.uname}</a>
                  <span className="add-time">{this.timeStr(item.addtime)}</span>
                </div>
                <div className='float-right'>
                  <div className='praise'>
                    <span className='praise-count'>{item.goods}</span>
                    <span className='liner'>&nbsp;</span>
                    <div onClick={this.click} className='reply'>回复</div>
                  </div>
                </div>
              </div>
              <p className="comment-text">{item.content}</p>
              <div className='reply-textarea-father'>
                <textarea placeholder={uname} className='reply-textarea' />
                <div className="reply-btn">
                  <button className="reply-btn1" onClick={this.displayClick}>取消</button>
                  <button className="reply-btn2">发送</button>
                </div>
              </div>
              {item.replyList.length === 0 ? <span style={{display: 'none'}} /> : <div className='reply-text clear-float'><a className='username float-left'>{item.replyList[0].userinfo.uname}:</a><div className='float-left text'>{item.replyList[0].content}</div></div>
              }
            </div>
          </div>
        )
      })
    }
    return (
      <div className='comment'>
        <div className='comment-header'>
          <div className="add-comment">
            <textarea placeholder="发表你精彩的评论吧" className='comment-textarea' />
            <button className="add-btn">发表评论</button>
          </div>

          <div className='comment-count'>评论<span>({this.state.data.length})</span></div>
        </div>
        <div className='comment-content'>
          {commentArray}
          <p className='more-see' onClick={this.moreSee}>查看更多评论</p>
          <p className="over-all">- 已加载全部 -</p>
        </div>
      </div>
    )
  }
}
export default CommentList
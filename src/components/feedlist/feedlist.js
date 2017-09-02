/**
 * Created by dllo on 17/9/1.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class FeedList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      content: {}
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
          data: this.state.data.concat(response.data.list)
        })
        console.log(this.state.data)
      }, () => {
        this.setState({
          content: this.state.data.content
        })
      })
    // console.log(this.state.data)
  }
  timeStr = (nS) => {
    let nowH = Math.round(new Date().getTime())
    let h = parseInt(nS) * 1000
    console.log(nowH)
    return h
  }

  componentDidMount () {
    this.ajaxData('feed/list.php?minId=')
  }

  render () {
    let contentArray = this.state.data.map((item, index) => {
      const content = item.content
      return (
        <div key={index.toString()} className='feedlist-one'>
          <div className='clear-float content-header'>
            <div className="float-left">
              <a className='float-left user-icon' href={'user.html?uid=' + item.userInfo.uid}><img
                src={item.userInfo.icon} /></a>
              <a className='float-left user-name green' href={'user.html?uid=' + item.userInfo.uid}>{item.userInfo.uname}</a>
              <p className='float-left user-con'>{item.userInfo.desc}</p>
            </div>
            <div className='float-right'>{this.timeStr(item.userInfo.time)}</div>
          </div>
          {content.typeName === 'article' ? <div>
            <a className="text-header green" href={'articleInfo.html?contentid=' + content.contentId}>{content.title}</a>
            <div className='article-content clear-float'>
              <div className='article-box float-left'>
                <div className='article-text'>
                  {content.desc}
                  <span className="view-all"> 
                    <a href={'articleInfo.html?contentid=' + content.contentId}>VIEW ALL
                       <img src={require('../../assets/images/viewall.png')} /> 
                    </a>
                  </span>
                  <div className="feed-user-name">
                    <a className="green">By/{item.authorInfo.uname}</a>
                  </div>
                  <div className="feed-others">
                    {item.statistics.view}次播放&nbsp;&nbsp;|&nbsp;&nbsp;评论:{item.statistics.comments}&nbsp;&nbsp;
                    |&nbsp;&nbsp;喜欢:{item.statistics.like}
                  </div>
                </div>
              </div>
              <div className="active-img">
                <a target="_blank">
                  <img src={content.imageInfo.img} />
                </a>
              </div>
            </div>
          </div> : content.typeName === 'timeline' ? <div className='timeline-content'>
            <div className='timeline-text'><a href={'timelineinfo.html?contentid=' + content.contentId}>{content.desc}</a></div>
            <div className="timeline-img">
              <a href={'timelineinfo.html?contentid=' + content.contentId}><img
                href={'timelineinfo.html?contentid=' + item.id} src={content.imageInfo.img} alt="" /></a>
            </div>
            <div className="feed-others">
              {item.statistics.view}次播放&nbsp;&nbsp;|&nbsp;&nbsp;评论:{item.statistics.comments}&nbsp;&nbsp;|&nbsp;&nbsp;
              喜欢:{item.statistics.like}
            </div>
          </div> : <div>
            <a href={'tingInfo.html?tingid=' + content.tingInfo.tingid} className='text-header green'>{content.title}</a>
            <div className='ting-text clear-float'>
              <div className='ting-img float-left'><a href={'tingInfo.html?tingid=' + content.tingInfo.tingid}><img src={content.imageInfo.img} /></a>
              </div>
              <div className='ting-content'> {content.desc}</div>
              <div className='ting-user-name green'><a target="_blank">主播:{item.authorInfo.uname}</a></div>
              <div className="feed-others">
                {item.statistics.view}次播放&nbsp;&nbsp;|&nbsp;&nbsp;评论:{item.statistics.comments}&nbsp;&nbsp;|&nbsp;&nbsp;
                喜欢:{item.statistics.like}
              </div>
            </div>
          </div>}
        </div>
      )
    })
    return (
      <div className='feedlist'>
        <div className='feedlist-header'>
          最新动态 | Lastest News
        </div>
        <div className='feedlist-content'>
          {contentArray}
        </div>
      </div>
    )
  }
}
export default FeedList
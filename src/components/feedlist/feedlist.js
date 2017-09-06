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
  componentDidUpdate () {
    document.body.onscroll = this.scroll
  }
  scroll = () => {
    let clientHeight = document.documentElement.clientHeight
    let pageheight = document.documentElement.scrollHeight
    let scroolTop = document.body.scrollTop
    if (pageheight * 0.9 <= clientHeight + scroolTop) {
      let minId = this.state.data[this.state.data.length - 1]['content'].contentId
      this.ajaxData('feed/list.php?minId=' + minId)
    }
  }
  time = (timeC) => {
    let nowDate = parseInt(new Date().getTime() / 1000)
    let prevTime = nowDate - timeC
    let prevDay = parseInt(prevTime / 86400)
    let prevHours = parseInt(prevTime / 3600)
    let prevMinu = parseInt(prevTime / 60)
    if (prevDay > 0) {
      return prevDay + ' day ago'
    } else if (prevDay <= 0 && prevHours > 0) {
      return prevHours + ' hours ago'
    } else if (prevHours <= 0 && prevMinu > 0) {
      return prevMinu + ' minutes ago'
    }
  }

  componentDidMount () {
    this.ajaxData('feed/list.php?minId=')
  }

  render () {
    let contentArray = this.state.data.map((item, index) => {
      if (item.userInfo.uname !== '片刻') {
        const content = item.content
        return (
          <div key={index.toString()} className='feedlist-one'>
            <div className='clear-float content-header'>
              <div className="float-left">
                <a target="_blank" className='float-left user-icon' href={'user.html?uid=' + item.userInfo.uid}><img
                  src={item.userInfo.icon} /></a>
                <a target="_blank" className='float-left user-name color green' href={'user.html?uid=' + item.userInfo.uid}>{item.userInfo.uname}</a>
                <p className='float-left user-con'>{item.userInfo.desc}</p>
              </div>
              <div className='float-right'>{this.time(item.userInfo.time)}</div>
            </div>
            {content.typeName === 'article' ? <div>
              <a target="_blank" className="text-header green color" href={'articleInfo.html?contentid=' + content.contentId}>{content.title}</a>
              <div className='article-content clear-float'>
                <div className='article-box float-left'>
                  <div className='article-text'>
                    {content.desc}
                    <span className="view-all"> 
                      <a target="_blank" href={'articleInfo.html?contentid=' + content.contentId}>VIEW ALL
                        <img src={require('../../assets/images/viewall.png')} /> 
                      </a>
                    </span>
                    {
                     item.authorInfo.uname === '' ? <span style={{display: 'none'}} /> : <div className="feed-user-name"><a href={'user.html?uid=' + item.authorInfo.uid} target="_blank" className="color green">By/{item.authorInfo.uname}</a></div>
                    }
                    <div className="feed-others">{item.statistics.view}次播放&nbsp;&nbsp;|&nbsp;&nbsp;评论:{item.statistics.comments}&nbsp;&nbsp;
                      |&nbsp;&nbsp;喜欢:{item.statistics.like}
                    </div>
                  </div>
                </div>
                <div className="active-img">
                  <a href={'articleInfo.html?contentid=' + content.contentId} target="_blank">
                    <img src={content.imageInfo.img} />
                  </a>
                </div>
              </div>
            </div> : content.typeName === 'timeline' ? <div className='timeline-content'>
              <div className='timeline-text'><a target='_blank'
                href={'timelineinfo.html?contentid=' + content.contentId}>{content.desc}</a></div>
              <div className="timeline-img">
                <a target="_blank" href={'timelineinfo.html?contentid=' + content.contentId}><img src={content.imageInfo.img} target="_blank" /></a>
              </div>
              <div className="feed-others">
                {item.statistics.view}次播放&nbsp;&nbsp;|&nbsp;&nbsp;评论:{item.statistics.comments}&nbsp;&nbsp;|&nbsp;&nbsp;
                喜欢:{item.statistics.like}
              </div>
            </div> : <div>
              <a target="_blank" href={'tingInfo.html?tingid=' + content.tingInfo.tingid} className='text-header color green'>{content.title}</a>
              <div className='ting-text clear-float'>
                <div className='ting-img float-left'>
                  <a target="_blank" href={'tingInfo.html?tingid=' + content.tingInfo.tingid}>
                    <img src={content.imageInfo.img} />
                  </a>
                </div>
                <div className='ting-content'>{content.desc}</div>
                {
                  item.authorInfo.uname === '' ? <span style={{display: 'none'}} /> : <div className='ting-user-name'><a className='green' href={'user.html?uid=' + item.authorInfo.uid} target="_blank">主播:{item.authorInfo.uname}</a></div>
                }
                <div className="feed-others">{item.statistics.view}次播放&nbsp;&nbsp;|&nbsp;&nbsp;评论:{item.statistics.comments}&nbsp;&nbsp;|&nbsp;&nbsp;喜欢:{item.statistics.like}</div>
              </div>
            </div> }
          </div>)
      }
    })
    return (
      <div className='feedlist'>
        <div className='feedlist-header'>
          最新动态 | Lastest News
        </div>
        <div className='feedlist-content'>
          {contentArray}
        </div>
        <div className='download-img'>
          <img src={require('../../assets/images/download.gif')} alt="" />
        </div>
      </div>
    )
  }
}
export default FeedList
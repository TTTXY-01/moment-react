/**
 * Created by dllo on 17/8/27.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class ReadListByHot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pageNum: 1
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
          data: this.state.data.concat(response.data)
        })
      })
  }
  // 滚轮事件
  scroll = () => {
    // console.log(document.body.scrollTop)
    // console.log(document.body.scrollHeight - document.documentElement.clientHeight)
    // 判断条件为 滚动到底部
    if (document.body.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight) {
      this.setState({
        pageNum: this.state.pageNum + 1
      }, () => {
        let interFace = '/hotcontent/list.php?' + location.search.match(/tag=\S+/g)[0] + '&type=article&pageNum=' + this.state.pageNum
        this.ajaxData(interFace)
      })
    }
  }
  componentDidMount() {
    // console.log(location.search.match(/tag=\S+/g)[0])
    // decodeURI方法解析url中文乱码问题
    // console.log(decodeURI(location.search.match(/tag=\S+/g)[0]))
    let interFace = '/hotcontent/list.php?' + location.search.match(/tag=\S+/g)[0] + '&type=article&pageNum=1'
    this.ajaxData(interFace)
    document.body.onscroll = this.scroll
  }
  render () {
    return (
      <div className='text-content'>
        {
          this.state.data.map((item, index) => {
            return (
              <div className='article-cpt' key={index.toString()}>
                <div className='article-info'>
                  <div className='article-info-box'>
                    <div className='article-title'>
                      <a href={'articleInfo.html?contentid=' + item.content.contentId} target='_blank'>{item.content.title}</a>
                    </div>
                    <div className='article-author'>
                      <a href={'user.html?uid=' + item.userInfo.uid} target='_blank'>By&nbsp;/&nbsp;{item.userInfo.uname}</a>
                    </div>
                    <div className='article-content'>
                      {item.content.desc}
                      <span className='view-all'>
                        <a href={'articleInfo.html?contentid=' + item.content.contentId} target='_blank'>
                          VIEW ALL
                          <img src={require('../../assets/images/viewall.png')} alt="" />
                        </a>
                      </span>
                    </div>
                    <div className='article-others'>
                      {item.statistics.view}次阅读&nbsp;|&nbsp;评论:{item.statistics.comments}&nbsp;|&nbsp;喜欢:{item.statistics.like}
                    </div>
                  </div>
                </div>
                <a href={'articleInfo.html?contentid=' + item.content.contentId} target='_blank'>
                  <div className='article-img' style={{backgroundImage: 'url("' + item.content.imageInfo.img + '")'}}>&nbsp;</div>
                </a>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ReadListByHot
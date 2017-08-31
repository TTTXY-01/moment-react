/**
 * Created by dllo on 17/8/26.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class WriteListByNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      minIndex: 0
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
  scroll = () => {
    // console.log(document.body.scrollTop)
    // console.log(document.body.scrollHeight - document.documentElement.clientHeight)
    // 判断条件为 滚动到底部
    if (document.body.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight) {
      this.setState({
        minIndex: this.state.data.length - 1
      }, () => {
        let interFace = '/article/listByNew.php?&minId=' + this.state.data[this.state.minIndex].content.contentId
        // console.log(this.state.data[this.state.minIndex].content.contentId)
        this.ajaxData(interFace)
      })
    }
  }
  componentDidMount() {
    this.ajaxData('/article/listByNew.php?minId=')
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
                      <a href={'articleInfo.html?contentid=' + item.content.contentId}>{item.content.title}</a>
                    </div>
                    <div className='article-author'>
                      <a href="###">By&nbsp;/&nbsp;{item.userInfo.uname}</a>
                    </div>
                    <div className='article-content'>
                      {item.content.desc}
                      <span className='view-all'>
                        <a href={'articleInfo.html?contentid=' + item.content.contentId}>
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
                <a href="###">
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

export default WriteListByNew
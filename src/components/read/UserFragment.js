/**
 * Created by dllo on 17/8/29.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class UserFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      colsH: [],
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
  // 瀑布流
  waterfall = (obj) => {
    let ones = document.getElementsByClassName(obj)
    let cols = parseInt(1200 / 300)
    for (var i = 0; i < cols; i++) {
      this.state.colsH[i] = 0
    }
    for (var k = 0; k < ones.length; k++) {
      let minIndex = 0
      let minH = this.state.colsH[0]
      for (var j = 0; j < this.state.colsH.length; j++) {
        if (minH > this.state.colsH[j]) {
          minH = this.state.colsH[j]
          minIndex = j
        }
      }
      ones[k].style.top = this.state.colsH[minIndex] + 15 + 'px'
      ones[k].style.left = 303 * minIndex + 'px'
      this.state.colsH[minIndex] += 15 + ones[k].offsetHeight
    }
    let maxHeight = 0
    for (var e = 0; e < this.state.colsH.length; e++) {
      if (maxHeight < this.state.colsH[e]) {
        maxHeight = this.state.colsH[e]
      }
    }
    document.getElementsByClassName('img-group-cpt')[0].style.height = maxHeight + 'px'
  }
  // 滚轮事件
  scroll = () => {
    // console.log(document.body.scrollTop)
    // console.log(document.body.scrollHeight - document.documentElement.clientHeight)
    // 判断条件为 滚动到底部
    if (document.body.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight) {
      this.setState({
        minIndex: this.state.data.length - 1
      }, () => {
        let interFace = '/timeline/listByUid.php' + location.search + '&pageSize=10&client=web&minId=' + this.state.data[this.state.minIndex].content.contentId
        // console.log(this.state.data[this.state.minIndex].content.contentId)
        this.ajaxData(interFace)
      })
    }
  }
  componentDidMount() {
    this.ajaxData('/timeline/listByUid.php' + location.search + '&pageSize=10&client=web&minId=')
    document.body.onscroll = this.scroll
  }
  componentDidUpdate() {
    this.waterfall('card-read-cpt')
  }
  render () {
    return (
      <div className='img-group-cpt'>
        {
          this.state.data.map((item, index) => {
            return (
              <div className='card-read-cpt' key={index.toString()}>
                <div className='card-top-img'>
                  <a href="###">
                    <img src={item.content.imageInfo.img} alt="" />
                  </a>
                </div>
                <div className='card-item'>
                  <div className='card-content'>
                    {item.content.desc}
                  </div>
                  <div className='timeline-voice'>
                    <a href="###" target='_blank'>[&nbsp;语音&nbsp;]</a>
                  </div>
                  <div className='card-others'>
                    <span className='card-type'><a href='read.html' target='_blank'>碎片</a></span>
                    <span>{item.statistics.view}次阅读&nbsp;&nbsp;|&nbsp;&nbsp;评论:{item.statistics.comments}&nbsp;&nbsp;|&nbsp;&nbsp;喜欢:{item.statistics.like}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserFragment
/**
 * Created by XiaoTong on 2017/8/29.
 */
import React, {Component} from 'react'
import '../../assets/styles/focus.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class MoreContent extends Component {
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
        console.log(response)
        this.setState({
          data: this.state.data.concat(response.data)
        })
      })
  }
  scroll = () => {
    if (document.getElementById('more-content').style.display === 'block' && document.documentElement.clientHeight + document.body.scrollTop === document.body.scrollHeight) {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.ajaxData('/headline/recent.php?pageSize=10&page=' + this.state.page)
      })
    }
  }
  waterfall = (obj) => {
    let ones = document.getElementsByClassName(obj)
    let cols = parseInt(1200 / 280)
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
      ones[k].style.top = this.state.colsH[minIndex] + 10 + 'px'
      ones[k].style.left = 306 * minIndex + 'px'
      this.state.colsH[minIndex] += 10 + ones[k].offsetHeight
    }
    let maxHeight = 0
    for (var e = 0; e < this.state.colsH.length; e++) {
      if (maxHeight < this.state.colsH[e]) {
        maxHeight = this.state.colsH[e]
      }
    }
    document.getElementsByClassName('img-group-cpt')[0].style.height = maxHeight + 'px'
  }

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      page: 1,
      colsH: []
    }
  }

  componentDidUpdate () {
    this.waterfall('card-ting-cpt')
  }

  componentDidMount () {
    this.ajaxData('/headline/recent.php?pageSize=10&page=1')
    document.body.onscroll = this.scroll
  }

  render () {
    return (
      <div id="more-content">
        <div id="past-content-title">
          <div className="title-cpt">往期精选</div>
        </div>
        <div className="img-group-cpt">
          {
            this.state.data.map((item, index) => {
              return (
                <div className="card-ting-cpt" key={index.toString()}>
                  <div className="card-top-img">
                    <a className="card-a" href="###">
                      <img className="card-img" src={item.cover} />
                      <span className="card-top-span">&nbsp;</span>
                    </a>
                  </div>
                  <div className="card-item">
                    <div className="card-ting-title">
                      <a className="card-title-a" href="###">{item.title}</a>
                    </div>
                    <div className="user-sign">
                      <a className="user-sign-a" href="###">主播 / {item.detail.authorinfo.uname}</a>
                    </div>
                    <div className="card-others">
                      <span className="card-type">
                        <a className="card-ting" href="###">&nbsp;&nbsp;ting&nbsp;&nbsp;</a>
                      </span>
                      <span className="card-span">7.8 k次播放&nbsp;&nbsp;|&nbsp;&nbsp;评论:8&nbsp;&nbsp;|&nbsp;&nbsp;
                        喜欢:64</span>
                    </div>
                    <div className="card-user">
                      <div className="card-user-info">
                        <a className="card-name" href="###">
                          <img className="card-header" src={item.detail.authorinfo.icon} />
                          <span className="card-s">{item.detail.authorinfo.uname}</span>
                        </a>
                        <div className="card-heart">&nbsp;</div>
                      </div>
                    </div>
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
export default MoreContent
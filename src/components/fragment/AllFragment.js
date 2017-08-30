/**
 * Created by dllo on 17/8/25.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class AllFragment extends Component {
  constructor (porps) {
    super(porps)
    this.state = {
      data: [],
      page: 20,
      url: '',
      tf: false,
      colsH: [],
      height: 0
    }
  }

  mouseover = (ev) => {
    ev.target.innerHTML = '♥'
  }
  mouseout = (ev) => {
    ev.target.innerHTML = '♡'
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
          data: this.state.data.concat(response.data)
        })
      })
  }

  componentDidMount () {
    this.state.url = 'newTimeLine/list.php?pageSize=' + this.state.page + '&tag=&minId='
    this.ajaxData(this.state.url)
    document.body.onscroll = this.scroll
  }

  componentDidUpdate () {
    this.waterfall('fragment-one')
  }

  scroll = () => {
    let scrollHeight = document.documentElement.scrollHeight
    let scrollTop = document.body.scrollTop
    let clientHeight = document.documentElement.clientHeight
    // console.log(scrollHeight, scrollTop, clientHeight)
    if (scrollHeight <= scrollTop + clientHeight) {
      this.setState({
        page: this.state.page + 20,
        url: 'newTimeLine/list.php?pageSize=' + this.state.page + '&tag=&minId='
      }, () => {
        this.ajaxData(this.state.url)
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
      ones[k].style.left = 298 * minIndex + 'px'
      this.state.colsH[minIndex] += 10 + ones[k].offsetHeight
    }
    // for (var e = 0; e < this.state.colsH.length; e++) {
    //   if (this.state.colsH[e] < this.state.colsH[e + 1]) {
    //     this.setState({
    //       height: this.state.colsH[e + 1]
    //     })
    //   }
    // }
  }

  render () {
    let fragmentArray = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className='fragment-one'>
          {
            item.coverimg === '' ? <span style={{display: 'none'}}>&nbsp;</span> : <img style={{height: item.height * 0.8}} src={item.coverimg} />
          }
          <div className='fragment-one-content'>
            <p className='fragment-one-text'>
              {item.text}
            </p>
            <div className='fragment-one-one-user clear-float'>
              <div className='user-left float-left'>
                <img src={item.userinfo.icon} />
                <span className='green-hover'>
                  {item.userinfo.uname}
                </span>
              </div>
              <div onMouseOver={this.mouseover} onMouseOut={this.mouseout} className='user-right float-right'>
                ♡
              </div >
            </div >
          </div >
        </div>
      )
    })
    return (
      <div className='allFragment'>
        <div className='hotLabel-title'>
          全部标签
        </div>
        <div className='allFragment-all'>
          {fragmentArray}
        </div>
      </div>
    )
  }
}
export default AllFragment
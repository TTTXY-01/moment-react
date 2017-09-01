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
      minIndex: 0,
      tf: false,
      colsH: []
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
          data: this.state.data.concat(response.data)
        })
      })
    console.log(this.state.data)
  }

  componentDidMount () {
    this.ajaxData('newTimeLine/list.php?pageSize=20&tag=&minId=')
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
    if (scrollHeight === scrollTop + clientHeight) {
      this.setState({
        minIndex: this.state.data.length - 1
      }, () => {
        this.ajaxData('newTimeLine/list.php?pageSize=20&tag=&minId=' + this.state.data[this.state.minIndex].id)
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
    let maxHeight = 0
    for (var e = 0; e < this.state.colsH.length; e++) {
      if (maxHeight < this.state.colsH[e]) {
        maxHeight = this.state.colsH[e]
      }
    }
    document.getElementsByClassName('allFragment-all')[0].style.height = maxHeight + 'px'
  }

  render () {
    let fragmentArray = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className='fragment-one'>
          <a target="_blank" href={'timelineinfo.html?contentid=' + item.id}>
            {
              item.coverimg === '' ? <span style={{display: 'none'}}>&nbsp;</span> : <img style={{height: item.height * 0.8}} src={item.coverimg} />
            }
          </a>
          <div className='fragment-one-content'>
            <p className='fragment-one-text'>
              {item.text}
            </p>
            <div className='fragment-one-one-user clear-float'>
              <div className='user-left float-left'>
                <a target="_blank" href={'user.html?uid=' + item.userinfo.uid}>
                  {
                    item.userinfo.icon === '' ? <img src={require('../../assets/images/user-default-img.png')} /> : <img src={item.userinfo.icon} />
                  }
                </a>
                <span className='green-hover'>
                  {item.userinfo.uname}
                </span>
              </div>
              <div className='user-right float-right'>
                &nbsp;
              </div >
            </div >
          </div >
        </div>
      )
    })
    return (
      <div className='allFragment'>
        <div className='hotLabel-title'>
          全部碎片
        </div>
        <div className='allFragment-all'>
          {fragmentArray}
        </div>
        <img style={{marginTop: '90px'}} src={require('../../assets/images/download.gif')} alt="" />
      </div>
    )
  }
}
export default AllFragment
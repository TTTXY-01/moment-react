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
      data: [], // 请求的参数
      minIndex: 0, // 最小的下标
      tf: false, // 布尔状态
      colsH: [], // 瀑布流的数组
      search: location.search.slice(1), // 地址栏的拼接参数 链接a
      label: '全部标签' // 标题的名称
    }
  }
  // ajax请求
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
    // console.log(this.state.data)
  }
  // 挂载完进行请求, 和滚轮滚动事件
  componentDidMount () {
    console.log(this.state.search)
    if (this.state.search === '') {
      this.ajaxData('newTimeLine/list.php?pageSize=20&tag=&minId=')
    } else {
      this.ajaxData('/newTimeLine/listByTag.php?pageSize=20& ' + this.state.search + '&minId=')
    }
    // 滚轮滚动事件
    document.body.onscroll = this.scroll
  }
  // 更新完成加载瀑布流
  componentDidUpdate () {
    this.waterfall('fragment-one')
  }
  // 滚动事件
  scroll = () => {
    let scrollHeight = document.documentElement.scrollHeight
    let scrollTop = document.body.scrollTop
    let clientHeight = document.documentElement.clientHeight
    // console.log(scrollHeight, scrollTop, clientHeight)
    if (scrollHeight === scrollTop + clientHeight) {
      this.setState({
        minIndex: this.state.data.length - 1
      }, () => {
        if (this.state.search === '') {
          this.ajaxData('newTimeLine/list.php?pageSize=20&tag=&minId=' + this.state.data[this.state.minIndex].id)
        } else {
          this.ajaxData('/newTimeLine/listByTag.php?pageSize=20& ' + this.state.search + '&minId=' + this.state.data[this.state.minIndex].id)
        }
      })
    }
  }
  // 瀑布流事件
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
              item.coverimg === '' ? <span style={{display: 'none'}}>&nbsp;</span> : <img style={{height: item.height * 0.9}} src={item.coverimg} />
            }
          </a>
          <div className='fragment-one-content'>
            <p className='fragment-one-text'>
              <a target="_blank" href={'timelineinfo.html?contentid=' + item.id}> {item.text}</a>
            </p>
            <div className='fragment-one-one-user clear-float'>
              <div className='user-left float-left'>
                <a target="_blank" href={'user.html?uid=' + item.userinfo.uid}>
                  {
                    item.userinfo.icon === '' ? <img src={require('../../assets/images/user-default-img.png')} /> : <img src={item.userinfo.icon} />
                  }
                </a>
                <span className='green-hover'>
                  <a className='user-a' target="_blank" href={'user.html?uid=' + item.userinfo.uid}> {item.userinfo.uname}</a>
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
          {this.state.search === '' ? this.state.label : decodeURI(this.state.search.slice(4))}
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
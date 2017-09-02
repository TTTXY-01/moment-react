import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')
// const arr = [1, 2, 3, 4, 5]
class RadioTingList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      theArr: [1, 2, 3, 4, 5]
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
          data: response.data
        })
      })
  }
  componentDidMount () {
    let radioid = location.search.split('=')
    this.ajaxData('/ting/listByRadio.php?radioid=' + radioid[1] + '&pageSize=10&pageNum=1')
    let numArr = document.querySelectorAll('.radio_detail_ting_pageNum')
    numArr.forEach((item) => {
      // 赋予初始的样式
      numArr[0].className = 'pageActive radio_detail_ting_pageNum'
    })
  }
  componentDidUpdate () {
    let radioid = location.search.split('=')
    this.ajaxData('/ting/listByRadio.php?radioid=' + radioid[1] + '&pageSize=10&pageNum=' + this.state.pageNum)
  }
  timeStr = (nS) => {
    let ymd = new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 8).replace(/\//g, '-')
    return ymd
  }
  numClick = (ev) => {
    // 获取左边按钮
    const prevDiv = document.getElementsByClassName('radio_detail_ting_prev')[0]
    // 获取分页每一个div
    let numArr = document.querySelectorAll('.radio_detail_ting_pageNum')
    numArr.forEach((item) => {
      // 赋予初始的样式
      item.className = 'radio_detail_ting_pageNum'
    })
    // 判断分页进度
    if (ev.target.innerHTML >= 4) {
      let theNumber = parseInt(ev.target.innerHTML)
      prevDiv.style.display = 'block'
      // 点击改变整体数组
      let changeArr = [theNumber - 2, theNumber - 1, theNumber, theNumber + 1, theNumber + 2]
      this.setState({
        theArr: changeArr
      })
      // 判断当点击的页码大于4时候, 动态添加的class永远都是中间的那个
      numArr.forEach((item, index) => {
        numArr[2].className = 'pageActive radio_detail_ting_pageNum'
      })
    } else {
      // 小于4的样式
      numArr.forEach((item) => {
        // 赋予初始的样式
        item.className = 'radio_detail_ting_pageNum'
      })
      prevDiv.style.display = 'none'
      ev.target.className = 'pageActive radio_detail_ting_pageNum'
    }
    console.log(ev.target.innerHTML)
    this.setState({
      pageNum: ev.target.innerHTML
    })
  }
  // 右按钮
  nextClick = () => {
    // 获取左按钮
    const prevDiv = document.getElementsByClassName('radio_detail_ting_prev')[0]
    // 获取初始状态下第一个带有绿色样式的div
    let firstDiv = document.getElementsByClassName('pageActive')[0]
    // 获取分页div
    let numArr = document.querySelectorAll('.radio_detail_ting_pageNum')
    if (firstDiv.innerHTML < 3) {
      numArr.forEach((item) => {
        item.className = 'radio_detail_ting_pageNum'
      })
      numArr[firstDiv.innerHTML].className = 'pageActive radio_detail_ting_pageNum'
    } else {
      let cutArr = this.state.theArr.map((item, index) => {
        return (item = item + 1)
      })
      this.setState({
        theArr: cutArr
      })
      prevDiv.style.display = 'block'
    }
    this.setState({
      pageNum: parseInt(firstDiv.innerHTML) + 1
    })
  }
  // 左按钮
  prevClick = () => {
    // 获取左按钮
    const prevDiv = document.getElementsByClassName('radio_detail_ting_prev')[0]
    // 获取初始状态下第一个带有绿色样式的div
    let firstDiv = document.getElementsByClassName('pageActive')[0]
    // 获取分页div
    let numArr = document.querySelectorAll('.radio_detail_ting_pageNum')
    console.log(firstDiv.innerHTML)
    if (firstDiv.innerHTML > 3) {
      let addArr = this.state.theArr.map((item, index) => {
        return (item = item - 1)
      })
      this.setState({
        theArr: addArr
      })
    }
    if (firstDiv.innerHTML <= 4) {
      prevDiv.style.display = 'none'
      numArr.forEach((item) => {
        item.className = 'radio_detail_ting_pageNum'
      })
      numArr[firstDiv.innerHTML - 2].className = 'pageActive radio_detail_ting_pageNum'
    }
    this.setState({
      pageNum: parseInt(firstDiv.innerHTML) + 1
    })
  }
  theIndex = () => {
    let Index = document.getElementsByClassName('ting_item_index')[0]
    Index.innerHTML = ''
  }
  render() {
    let listByRadioArray = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className="ting_item" onMouseEnter={this.theIndex}>
          <div className="ting_item_index">
            {index + 1}
          </div>
          <div className="ting_item_title">
            {item.title}
          </div>
          <div className="ting_item_like" />
          <div className="ting_item_share">
            <div className="ting_item_shareBox">
              <div className="info_detail_shareBox_wrap">
                <div className="info_detail_shareSina" />
                <div className="info_detail_shareWechat">
                  <p className="info_detail_shareCode" />
                </div>
                <div className="info_detail_shareQzone" />
                <div className="info_detail_shareDou" />
              </div>
            </div>
          </div>
          <div className="ting_item_right">
            <span className="ting_item_plays">{(item.plays / 1000).toFixed(1)}K次播放</span>
            <span className="ting_item_time">{this.timeStr(item.addtime)}</span>
          </div>
        </div>
      )
    })
    let RadioPrevArray = this.state.theArr.map((item, index) => {
      return (
        <div key={index.toString()} className="radio_detail_ting_pageNum" onClick={this.numClick}>
          {item}
        </div>
      )
    })
    return (
      <div className="radio_detail_ting">
        <div className="info_text_title">
          TING | 617首
        </div>
        <div className="radio_detail_ting_wrap">
          {listByRadioArray}
        </div>
        <div className="radio_detail_ting_page">
          <p className="radio_detail_ting_prev" onClick={this.prevClick} />
          <div className="radio_detail_ting_pageNum_wrap">
            <div className="radio_detail_ting_pageNum_move">
              {RadioPrevArray}
            </div>
          </div>
          <p className="radio_detail_ting_next" onClick={this.nextClick} />
        </div>
      </div>
    )
  }
}
export default RadioTingList

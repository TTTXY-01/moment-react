import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')
const arr = [1, 2, 3, 4, 5]
class RadioTingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pageNum: 1,
      radioid: location.search.split('=')[1],
      itemClass: true
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
        // console.log(response.data)
      })
  }

  componentDidMount () {
    this.ajaxData('/ting/listByRadio.php?radioid=' + this.state.radioid + '&pageSize=10&pageNum=1')
  }

  numClick = (ev) => {
    const numDiv = document.getElementsByClassName('radio_detail_ting_pageNum_move')[0]
    const prevDiv = document.getElementsByClassName('radio_detail_ting_prev')[0]
    let numArr = document.querySelectorAll('.radio_detail_ting_pageNum')
    numArr.forEach((item) => {
      item.className = 'radio_detail_ting_pageNum'
    })
    console.log(ev.target.innerHTML)
    // console.log(document.getElementsByName('radio_detail_ting_prev')[0])
    if (ev.target.innerHTML >= 4) {
      prevDiv.style.display = 'block'
      numDiv.style.left = numDiv.offsetLeft - 40 + 'px'
    } else {
      prevDiv.style.display = 'none'
    }
    ev.target.className = 'pageActive radio_detail_ting_pageNum'
    // console.log(numArr)
    // this.setState({
    //   data: []
    // })
    // console.log('/ting/listByRadio.php?radioid=' + this.state.radioid + '&pageSize=10&pageNum=' + ev.target.textContent)
    // console.log(ev.target.textContent)
    // this.ajaxData('/ting/listByRadio.php?radioid=' + this.state.radioid + '&pageSize=10&pageNum=' + ev.target.textContent)
  }
  prevClick = () => {
    const numDiv = document.getElementsByClassName('radio_detail_ting_pageNum_move')[0]
    if (numDiv.offsetLeft === 0) {
      numDiv.style.left = 0
    } else {
      numDiv.style.left = numDiv.offsetLeft + 40 + 'px'
    }
  }
  nextClick = () => {
    const numDiv = document.getElementsByClassName('radio_detail_ting_pageNum_move')[0]
    console.log(numDiv)
    numDiv.style.left = numDiv.offsetLeft - 40 + 'px'
  }

  render () {
    let RadioPrevArray = arr.map((item) => {
      return (
        <div className="radio_detail_ting_pageNum" onClick={this.numClick}>
          {item}
        </div>
      )
    })
    return (
      <div className="radio_detail_ting_page">
        <p className="radio_detail_ting_prev" onClick={this.prevClick} />
        <div className="radio_detail_ting_pageNum_wrap">
          <div className="radio_detail_ting_pageNum_move">
            {RadioPrevArray}
          </div>
        </div>
        <p className="radio_detail_ting_next" onClick={this.nextClick} />
      </div>
    )
  }
}
export default RadioTingPage

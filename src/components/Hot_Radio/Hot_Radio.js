import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class HotRadio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
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
        console.log(response)
        this.setState({
          data: response.data
        })
      })
  }
  componentDidMount () {
    this.ajaxData('/ting/listOfRadio.php?pageSize=3&sort=2&pageNum=1')
  }
  render() {
    let Array = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()}>
          <p>{item.title}</p>
        </div>
      )
    })
    return (
      <div className="top_wrap">
        <div className="recommend_title">
          <span>热门电台 | Hot Radio</span>
        </div>
        <div>
          {Array}
        </div>
      </div>
    )
  }
}
export default HotRadio
import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')
class RadioTingPage extends Component {
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
        this.setState({
          data: response.data
        })
        console.log(this.state.data)
      })
  }
  componentDidMount () {
    console.log(this.state.pageNum)
    let radioid = location.search.split('=')
    this.ajaxData('/ting/listByRadio.php?radioid=' + radioid[1] + '&pageSize=10&pageNum=' + this.state.pageNum)
  }
  render() {
    let RadioPrevArray = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className="radio_detail_ting_pageNum">
          {this.state.pageNum++}
        </div>
      )
    })
    return (
      <div className="radio_detail_ting_page">
        <p className="radio_detail_ting_prev" onClick={this.click} />
        {RadioPrevArray}
        <p className="radio_detail_ting_next" onClick={this.click} />
      </div>
    )
  }
}
export default RadioTingPage

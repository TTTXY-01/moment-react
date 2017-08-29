import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  // http://pianke.me/version5.0/pub/ad.php?type=3&sig=0E35C28AD161573F2E81ACF51B671ED8
  componentDidMount () {
    const time = new Date()
    // 2.根据当前时间, 进行格式化 yyyymmddHHMMss
    const timestamp = dateformat(time.getTime(), 'yyyymmddHHMMss')
    // 3.将字符串 0+''+timestamp 转成MD5, 并变为全大写
    const sig = md5('0' + '' + timestamp).toUpperCase()
    const Authorization = base64.btoa('' + ':' + timestamp)
    const url = '/api/pub/ad.php?type=3&sig=' + sig
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
  render () {
    return (
      <h1>aaa</h1>
    )
  }
}

export default App

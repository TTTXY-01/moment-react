import React, {Component} from 'react'
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
        console.log(response)
        this.setState({
          data: response.data
        })
      })
  }

  render () {
    const dataArray = this.state.data.map((item, index) => {
      return (
        <p key={index.toString()}>{item.title}</p>
      )
    })
    return (
      <div>
        <h1>梁佳军好帅,窝唉泥 记得找我哦,包小姐: 13983726593</h1>
        {dataArray}
        <img src={require('./../../assets/images/timg.jpg')} />
        <a href='about.html'>关于我们</a>
      </div>
    )
  }
}

export default App

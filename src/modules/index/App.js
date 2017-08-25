import React, {Component} from 'react'
import Recommendation from '../../components/transceiver/Recommendation_TING'
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
<<<<<<< HEAD
  // 3.将字符串 0+''+timestamp 转成MD5, 并变为全大写2:5: 'fetch' is not defined.

=======
    // 3.将字符串 0+''+timestamp 转成MD5, 并变为全大写
>>>>>>> 2f0d0af343f1267eb3b328bbfa18f49acc3a3b05
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
      <div>
        <Recommendation />
      </div>
    )
  }
}

export default App

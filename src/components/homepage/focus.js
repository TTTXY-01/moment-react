/**
 * Created by XiaoTong on 2017/8/25.
 */
import React, {Component} from 'react'
import '../../assets/styles/focus.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Focus extends Component {
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

  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    this.ajaxData('/headline/recent.php?location=special')
  }

  render () {
    return (
      <div>
        <div id="big-focus">
          {
            this.state.data.map((item, index) => {
              return (
                <div className={'focus' + index} key={index.toString()}>
                  <a className={'focus-a' + index} href='###'>
                    <img className={'focus-img' + index} src={item.cover} />
                    <span className={'focus-span' + index}>&nbsp;</span>
                  </a>
                  <p className={'focus-p' + index}>——<br />
                    {item.title}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default Focus
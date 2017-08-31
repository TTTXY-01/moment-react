/**
 * Created by XiaoTong on 2017/8/29.
 */
import React, {Component} from 'react'
import '../../assets/styles/focus.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class MoreBtn extends Component {
  btnmore = (ev) => {
    ev.target.parentNode.parentNode.style.display = 'none'
    ev.target.parentNode.parentNode.nextElementSibling.style.display = 'block'
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
        // console.log(response.data[2].data)
        this.setState({
          data: response.data[2].data
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
    var now = new Date()
    var time = now.getFullYear() + '-' + ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1) + '-' + (now.getDate() < 10 ? '0' : '') + now.getDate()
    this.ajaxData('/headline/day.php?time=' + time + '&mode=day')
  }

  render () {
    return (
      <div className="more-button">
        <div className="btn-box">
          <div className="btn-more" onClick={this.btnmore}>查看更多精选内容</div>
        </div>
      </div>
    )
  }
}
export default MoreBtn
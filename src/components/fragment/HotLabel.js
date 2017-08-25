/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class HotLabel extends Component {
  constructor (poprs) {
    super(poprs)
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
        // console.log(response)
        this.setState({
          data: response.data
        })
      })
  }
  componentDidMount () {
    this.ajaxData('/newTimeLine/tagList.php?num=12')
    // console.log(this.state.data)
  }

  render () {
    const dataArray = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className='hotLabel-content-one'>
          <a>
            <img className='img' src={item.img} />
            <div className='hotLabel-content-one-text'>
              <div>{item.tag}</div>
              <div>{item.count}</div>
            </div>
          </a>
        </div>
      )
    })

    return (
      <div className='hotLabel'>
        <div className='hotLabel-title'>
          热门标签
        </div>
        <div className='hotLabel-content'>
          {dataArray}
        </div>
      </div>
    )
  }
}
export default HotLabel

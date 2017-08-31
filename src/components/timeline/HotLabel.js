/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
import AllFragment from './AllFragment'
import Classreagment from './ClassFragment'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class HotLabel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      index: 0,
      bool: true,
      tag: ''
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
  }

  tagValue = (ev) => {
    this.setState({
      tag: ev.target.getAttribute('name'),
      bool: false
    })
  }

  render () {
    const dataArray = this.state.data.map((item, index) => {
      return (
        <div name={item.tag} onClick={this.tagValue} key={index.toString()} className='hotLabel-content-one'>
          <a name={item.tag}>
            <img name={item.tag} className='img' src={item.img} />
            <div name={item.tag} className='hotLabel-content-one-text'>
              <div name={item.tag}>{item.tag}</div>
              <div name={item.tag}>{item.count}</div>
            </div>
          </a>
        </div>
      )
    })
    return (
      <div>
        <div className='hotLabel'>
          <div className='hotLabel-title'>
            热门标签
          </div>
          <div className='hotLabel-content'>
            {dataArray}
          </div>
        </div>
        {
          this.state.bool ? <AllFragment /> : <Classreagment valueTag={this.state.tag} />
        }
      </div>
    )
  }
}
export default HotLabel

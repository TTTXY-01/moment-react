/**
 * Created by dllo on 17/8/25.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class AllFragment extends Component {
  constructor (porps) {
    super(porps)
    this.state = {
      data: [],
      page: 20,
      tf: false
    }
  }

  mouseover = (ev) => {
    ev.target.innerHTML = '♥'
  }
  mouseout = (ev) => {
    ev.target.innerHTML = '♡'
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
    const url = 'newTimeLine/list.php?pageSize=' + this.state.page + '&tag=&minId='
    this.ajaxData(url)
  }
  render () {
    let fragmentArray = this.state.data.map((item, index) => {
      return (
        <li key={index.toString()} className='fragment-one'>
          <img src={item.coverimg} />
          <div className='fragment-one-content'>
            <p className='fragment-one-text'>
              {item.text}
            </p>
            <div className='fragment-one-one-user clear-float'>
              <di className='user-left float-left'>
                <img src={item.userinfo.icon} alt="" />
                <span className='green-hover'>
                  {item.userinfo.uname}
                </span>
              </di >
              <div onMouseOver={this.mouseover} onMouseOut={this.mouseout} className='user-right float-right'>
                ♡
              </div >
            </div >
          </div >
        </li>
      )
    })
    return (
      <div
        className='allFragment'>
        <div
          className='hotLabel-title'>
          全部标签
        </div>
        {fragmentArray}
      </div>
    )
  }
}
export default AllFragment
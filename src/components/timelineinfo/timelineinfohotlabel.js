/**
 * Created by dllo on 17/9/1.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Timelineinfohotlabel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      data1: []
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
        // console.log(this.state.data)
      })
  }
  ajaxData1 = (interFace) => {
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
          data1: response.data
        })
        // console.log(this.state.data1)
      })
  }

  componentDidMount () {
    this.ajaxData('newTimeLine/tagList.php?num=10')
    this.ajaxData1('newTimeLine/list.php?pageSize=4')
  }

  render () {
    let HotLabel = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className='btn-tag'>
          <a target="_blank" href={'timeline.html?tag=' + item.tag}>{item.tag}</a>
        </div>
      )
    })
    let cottrlation = this.state.data1.map((item, index) => {
      return (
        <div key={index.toString()} className='fragment-one'>
          <a target="_blank" href={'timelineinfo.html?contentid=' + item.id}>
            {
              item.coverimg === '' ? <span style={{display: 'none'}}>&nbsp;</span> : <img style={{height: item.height * 0.8}} src={item.coverimg} />
            }
          </a>
          <div className='fragment-one-content'>
            <p className='fragment-one-text'>
              <a target="_blank" href={'timelineinfo.html?contentid=' + item.id}> {item.text}</a>
            </p>
            <div className='fragment-one-one-user clear-float'>
              <div className='user-left float-left'>
                <a target="_blank" href={'user.html?uid=' + item.userinfo.uid}>
                  {
                    item.userinfo.icon === '' ? <img src={require('../../assets/images/user-default-img.png')} /> : <img src={item.userinfo.icon} />
                  }
                </a>
                <span className='green-hover'>
                  <a className='user-a' target="_blank" href={'user.html?uid=' + item.userinfo.uid}> {item.userinfo.uname}</a>
                </span>
              </div>
              <div className='user-right float-right'>
                &nbsp;
              </div >
            </div >
          </div >
        </div>
      )
    })
    return (
      <div>
        <div className='info-hotlabel'>
          <div className="info-hotlabel-header">
            热门标签
          </div>
          <div className="info-hotlabel-content">
            {HotLabel}
          </div>
        </div>
        <div className='info-correlation'>
          <div className='info-correlation-header'>
            相关碎片
          </div>
          <div className='info-correlation-content'>
            {cottrlation}
          </div>
        </div>
      </div>
    )
  }
}

export default Timelineinfohotlabel
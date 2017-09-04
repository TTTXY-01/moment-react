/**
 * Created by XiaoTong on 2017/8/28.
 */
import React, {Component} from 'react'
import '../../assets/styles/focus.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Hot extends Component {
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

  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    this.ajaxData('/pub/interested.php?pageSize=4')
  }

  render () {
    return (
      <div id="hot-list-group">
        <div id="title-cpt">
          <div className="title-black">1</div>
          <span className="title-ting">人气片客 | Hot Pianker</span>
        </div>
        <div id="user-list">
          {
            this.state.data.map((item, index) => {
              return (
                <div className={'user-cpt' + index} key={index.toString()}>
                  <div className="user-info">
                    <div className="user-cpt-left">
                      <a className="user-cpt-a" href={'user.html?uid=' + item.uid} target="_blank">
                        <img className="user-cpt-img" src={item.icon} />
                        <div className={'user-cpt-label' + index} key={index.toString()}>&nbsp;</div>
                      </a>
                    </div>
                    <div className="user-cpt-right">
                      <div className="user-name">
                        <a className="user-name-a" href={'user.html?uid=' + item.uid} target="_blank">{item.uname}</a>
                      </div>
                      <div className="user-des">{item.desc}</div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Hot
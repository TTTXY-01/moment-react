/**
 * Created by XiaoTong on 2017/9/2.
 */
import React, {Component} from 'react'
import '../../assets/styles/account-setting.styl'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Setting extends Component {
  save = () => {
    document.getElementById('show-save').style.display = 'block'
    setTimeout(function () {
      document.getElementById('show-save').style.display = 'none'
    }, 1500)
  }

  constructor (props) {
    super(props)
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
        // console.log(response.data)
        this.setState({
          data: response.data
        }, () => {
          console.log(this.state.data)
        })
      })
  }

  componentDidMount () {
    this.ajaxData('/user/info.php?uid=4561988&isDetail=1')
  }

  render () {
    return (
      <div id="container">

        <div className="user-set-content">
          <div className="type-title-cpt">
            <span className="active">账号设置</span>
          </div>
          <div className="set-content">
            <div className="user-set">
              <div className="set-icon">
                <div>
                  <span className="set-text">头像:</span>
                  <img className="set-header" src={this.state.data.icon} />
                </div>
                <div className="change-icon">
                  <span className="set-point-text">修改</span>
                </div>
              </div>
              <div className="set-name">
                <span className="set-text">昵称:</span>
                <input type="text" placeholder={this.state.data.uname} maxLength="30" />
                <span className="set-warn-text">4-30个字符,中英文均可</span>
              </div>
              <div>
                <span className="set-text">手机号:</span>
                13478791204
                <span className="set-point-text">
                  <a href="###">修改</a>
                </span>
              </div>
              <div>
                <span className="set-text">密码:</span>
                <span className="set-point-text">
                  <a href="###">修改</a>
                </span>
              </div>
              <div className="set-sex">
                <span className="set-text">性别:</span>
                <label className="radiovote">
                  <span className="voteContent">男</span>
                  <input type="radio" name="a" />
                </label>
                <label className="radiovote">
                  <span className="voteContent">女</span>
                  <input type="radio" checked="true" />
                </label>
              </div>
            </div>
            <div className="set-des">
              <span className="set-text">简介:</span>
              <textarea className="the-text" placeholder="请输入简介" maxLength="36" />
            </div>
            <div className="set-btn" onClick={this.save}>保存设置</div>
            <div id="show-save">
              <div className="save-img">&nbsp;</div>
              <p className="save-p">修改成功</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Setting
/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Publish extends Component {
  constructor (props) {
    super(props)
    this.state = {
      time: new Date(),
      addLabel: true,
      placeholder: '这一刻,你在想什么?',
      publish: '发布碎片',
      change: '0',
      values: '',
      display: true
    }
  }

  publicClick = (ev) => {
    this.setState({
      placeholder: '这一刻,你在想什么?',
      publish: '发布碎片',
      addLabel: true
    })
    ev.target.nextElementSibling.className = ''
    ev.target.className = 'publicity-btn'
  }
  privacyClick = (ev) => {
    this.setState({
      placeholder: '以匿名的方式倾诉,我们会将你的秘密随机推送给5位陌生人。',
      publish: '匿名发布',
      addLabel: false
    })
    ev.target.previousElementSibling.className = ''
    ev.target.className = 'publicity-btn'
  }
  documentClick = (ev) => {
    if (!this.state.display) {
      document.getElementsByClassName('all-label')[0].style.display = 'none'
      ev.stopPropagation()
    }
    this.setState({
      display: true
    })
  }
  changes = (ev) => {
    if (ev.target.value.length <= 140) {
      this.setState({
        change: ev.target.value.length,
        values: ev.target.value
      })
      ev.target.style.borderColor = 'rgb(120,188,133)'
      ev.target.style.borderWidth = '1px'
      ev.target.style.borderStyle = 'solid'
    }
    if (ev.target.value.length <= 0) {
      ev.target.style.borderColor = '#e8e8e8'
      ev.target.style.borderWidth = '1px'
      ev.target.style.borderStyle = 'solid'
    }
  }
  display = (ev) => {
    document.body.onclick = null
    if (this.state.display) {
      ev.target.nextElementSibling.style.display = 'block'
      this.setState({
        display: false
      })
      document.body.onclick = this.documentClick
    } else {
      ev.target.nextElementSibling.style.display = 'none'
      this.setState({
        display: true
      })
    }
  }
  tagValue = (ev) => {
    console.log(this.state.display)
    console.log(ev.target.textContent)
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
        console.log(response)
        this.setState({
          data: this.state.data.concat(response.data)
        })
      })
  }
  publish = () => {
    if (this.state.values.length <= 0) {
      document.getElementsByClassName('publish-alert')[0].style.display = 'block'
      setTimeout(() => {
        document.getElementsByClassName('publish-alert')[0].style.display = 'none'
      }, 2000)
    } else {
      this.ajaxData()
    }
  }

  render () {
    const day = this.state.time.getDate()
    return (
      <div className='publish clear-float'>
        <div className='publish-time float-left'>
          <span>{day}</span>
          <span>August</span>
        </div>
        <div className='publish-content float-right'>
          <textarea value={this.state.values} onChange={this.changes} className='publish-textarea' placeholder={this.state.placeholder} />
          <div className='publish-button clear-float'>
            <div className='float-left clear-float'>
              <span className='publicity float-left'>
                <span onClick={this.publicClick} className='publicity-btn '>公开</span>
                <span onClick={this.privacyClick}>匿名</span>
              </span>
              <div className='up-img float-left'>
                <div className='publish-img'>图片</div>
                <input type="file" />
              </div>
              {this.state.addLabel ? <div className='publish-label float-left add-label' onClick={this.display}>添加标签</div> : <div className='float-left privacy-label'>私密</div>}
              <div className='all-label'>
                <span onClick={this.tagValue}>悄悄话</span>
                <span>戳心歌词</span>
                <span>一件钟情的句子</span>
                <span>电影截图+经典台词</span>
                <span>黑白大片</span>
                <span>最美摘抄</span>
                <span>旧书摊</span>
                <span>看照片猜身高</span>
                <span>三行情书</span>
                <span>给力头像都在这</span>
                <span>自拍狂魔</span>
                <span>给诗歌配图</span>
              </div>
            </div>
            <div className='float-right'>
              <span>{this.state.change}/140字</span>
              <span className='publish-btn' onClick={this.publish}>
                {this.state.publish}
              </span>
            </div>
          </div>
        </div>
        <div className='publish-alert'>请输入内容</div>
      </div>
    )
  }
}

export default Publish
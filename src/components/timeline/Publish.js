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
      data: [],
      datas: [],
      time: new Date(),
      addLabel: true,
      placeholder: '这一刻,你在想什么?',
      publish: '发布碎片',
      change: '0',
      values: '',
      display: true,
      tag: '',
      uid: '',
      pas: '',
      code: 1,
      addTag: '添加标签',
      displayImg: false
    }
  }
  // 挂载完成查看cookie里是否有账号密码
  componentDidMount () {
    let mobile = document.cookie === '' ? '' : document.cookie.match(/mobile=\d+/g)[0].substr(7)
    let password = document.cookie === '' ? '' : document.cookie.match(/password=\d+/g)[0].substr(9)
    let interFace = '/user/login.php?mobile=' + mobile + '&pwd=' + password
    if (document.cookie !== '') {
      this.ajaxData(interFace)
    }
  }
  // 公开按钮
  publicClick = (ev) => {
    this.setState({
      placeholder: '这一刻,你在想什么?',
      publish: '发布碎片',
      addLabel: true
    })
    ev.target.nextElementSibling.className = ''
    ev.target.className = 'publicity-btn'
  }
  // 私密按钮
  privacyClick = (ev) => {
    this.setState({
      placeholder: '以匿名的方式倾诉,我们会将你的秘密随机推送给5位陌生人。',
      publish: '匿名发布',
      addLabel: false
    })
    ev.target.previousElementSibling.className = ''
    ev.target.className = 'publicity-btn'
  }
  // 添加标签按钮
  display = (ev) => {
    if (this.state.display) {
      ev.target.nextElementSibling.style.display = 'block'
      this.setState({
        display: false
      })
    } else {
      ev.target.nextElementSibling.style.display = 'none'
      this.setState({
        display: true
      })
    }
    document.body.onclick = this.documents
  }
  // 点击body效果
  documents = (ev) => {
    let allLabel = document.getElementsByClassName('all-label')[0]
    let allLabelParentLeft = allLabel.parentNode.parentNode.offsetLeft + allLabel.offsetLeft
    let allLabelParentTop = allLabel.parentNode.parentNode.offsetTop + allLabel.offsetTop
    let left = ev.pageX < allLabelParentLeft || ev.pageX > allLabel.offsetWidth + allLabelParentLeft
    let top = ev.pageY < allLabelParentTop || ev.pageY > allLabelParentTop + allLabel.offsetHeight
    if (left || top) {
      allLabel.style.display = 'none'
      this.setState({
        display: true
      })
    }
  }
  // 点击添加标签 获取点击内容
  tagValue = (ev) => {
    ev.target.parentNode.style.display = 'none'
    this.setState({
      display: true,
      addTag: ev.target.textContent,
      tag: ev.target.textContent
    })
  }
  // 文本框效果
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
  // 登录请求
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
          data: response.data,
          uid: response.data.uid,
          pas: response.data.password,
          code: response.code
        })
      })
  }
  // 发布请求
  ajaxDatas = (interFace) => {
    const time = new Date()
    // 2.根据当前时间, 进行格式化 yyyymmddHHMMss
    const timestamp = dateformat(time.getTime(), 'yyyymmddHHMMss')
    // 3.将字符串 0+''+timestamp 转成MD5, 并变为全大写
    const sig = md5(this.state.uid + this.state.pas + timestamp).toUpperCase()
    const Authorization = base64.btoa(this.state.uid + ':' + timestamp)
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
          datas: response.data
        })
      })
  }
  // 发布按钮
  publish = () => {
    if (this.state.values.length <= 0) {
      document.getElementsByClassName('publish-alert')[0].style.display = 'block'
      setTimeout(() => {
        document.getElementsByClassName('publish-alert')[0].style.display = 'none'
      }, 2000)
      this.setState({
        values: '',
        addTag: '添加标签'
      })
    } else {
      if (this.state.code === 0) {
        this.ajaxDatas('timeline/add.php?content=' + this.state.values + '&imgurl=&tag=' + this.state.tag)
        document.getElementsByClassName('publish-alert2')[0].style.display = 'block'
        setTimeout(() => {
          document.getElementsByClassName('publish-alert2')[0].style.display = 'none'
        }, 2000)
      } else {
        document.getElementsByClassName('publish-alert1')[0].style.display = 'block'
        setTimeout(() => {
          document.getElementsByClassName('publish-alert1')[0].style.display = 'none'
        }, 2000)
      }
      this.setState({
        values: '',
        addTag: '添加标签'
      })
    }
  }
  // 上传图片
  displayImg = () => {
    let displayImg = document.getElementsByClassName('image')[0]
    this.setState({
      displayImg: !this.state.displayImg
    })
    if (this.state.displayImg) {
      displayImg.style.display = 'black'
    } else {
      displayImg.style.display = 'none'
    }
  }
  render () {
    const day = this.state.time.getDate() > 10 ? this.state.time.getDate() : '0' + this.state.time.getDate()
    let allLabel = ['悄悄话', '戳心歌词', '一件钟情的句子', '电影截图+经典台词', '黑白大片', '最美摘抄', '旧书摊', '看照片猜身高', '三行情书', '给力头像都在这', '自拍狂魔', '给诗歌配图']
    let allLeabelArr = allLabel.map((item, index) => {
      return <span key={index.toString()} onClick={this.tagValue}>{item}</span>
    })
    return (
      <div className='publish clear-float'>
        <div className='publish-time float-left'>
          <span>{day}</span>
          <span>September</span>
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
                <input type="file" onChange={this.displayImg} />
                <div className="image"><img src={require('../../assets/images/imgUp.png')} alt="" /></div>
              </div>
              {this.state.addLabel ? <div className='publish-label float-left add-label' onClick={this.display}>{this.state.addTag}</div> : <div className='float-left privacy-label'>私密</div>}
              <div className='all-label'>
                {allLeabelArr}
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
        <div className="publish-alert1">请先登录</div>
        <div className="publish-alert2">发布成功</div>
      </div>
    )
  }
}

export default Publish

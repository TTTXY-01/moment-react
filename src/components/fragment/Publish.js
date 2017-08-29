/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'

class Publish extends Component {
  constructor (porps) {
    super(porps)
    this.state = {
      time: new Date(),
      click: true,
      placeholder: '这一刻,你在想什么?',
      publish: '发布碎片',
      change: '0',
      values: '',
      display: false
    }
    console.log(this.state.time)
  }

  publicClick = (ev) => {
    this.setState({
      placeholder: '这一刻,你在想什么?',
      publish: '发布碎片'
    })
    ev.target.nextElementSibling.className = ''
    ev.target.className = 'publicity-btn'
  }
  privacyClick = (ev) => {
    this.setState({
      placeholder: '以匿名的方式倾诉,我们会将你的秘密随机推送给5位陌生人。',
      publish: '匿名发布'
    })
    ev.target.previousElementSibling.className = ''
    ev.target.className = 'publicity-btn'
  }
  changes = (ev) => {
    if (ev.target.value.length <= 140) {
      this.setState({
        change: ev.target.value.length,
        values: ev.target.value
      })
    }
  }
  display = (ev) => {
    this.setState({
      display: !this.state.display
    })
    if (this.state.display) {
      ev.target.nextElementSibling.style.display = 'block'
    } else {
      ev.target.nextElementSibling.style.display = 'none'
    }
  }

  publish = () => {
    if (this.state.values.length <= 0) {
      document.getElementsByClassName('publish-alert')[0].style.display = 'block'
      setTimeout(() => {
        document.getElementsByClassName('publish-alert')[0].style.display = 'none'
      }, 2000)
    } else {
      document.getElementsByClassName('publish-alert')[0].style.display = 'none'
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
              <div className='publish-label float-left add-label' onClick={this.display}>添加标签
              </div>
              <div className='all-label'>
                <span>悄悄话</span>
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
import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class RadioType extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pageNum: 1,
      imgUrl: location.search.split('=')[1]
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
          data: this.state.data.concat(response.data)
        })
      })
  }
  componentDidMount () {
    let numArr = document.querySelectorAll('.radio_title')
    numArr.forEach((item) => {
      // 获取name的值和传入的值作对比,相同的赋予初始样式
      if (item.getAttribute('name') === location.search.split('=')[1]) {
        item.className = 'radio_title radio_active'
      }
    })
    this.ajaxData('/ting/listByStyle.php' + location.search + '&sort=1&pageSize=9&pageNum=' + this.state.pageNum)
  }
  componentDidUpdate () {
    window.addEventListener('scroll', this.handleScroll)
  }
  // 滚动添加数据
  handleScroll = () => {
    let STop = document.body.scrollTop
    const DHeight = document.documentElement.clientHeight
    const SHeight = document.documentElement.scrollHeight
    if (SHeight === STop + DHeight) {
      this.setState({
        pageNum: this.state.pageNum + 1
      }, () => {
        this.ajaxData('/ting/listByStyle.php?style=' + this.state.imgUrl + '&sort=1&pageSize=9&pageNum=' + this.state.pageNum)
      })
    }
  }
  click = (ev) => {
    let numArr = document.querySelectorAll('.radio_title')
    numArr.forEach((item) => {
      // 赋予初始的样式
      item.className = 'radio_title'
    })
    // 点击添加样式
    ev.target.className = 'radio_title radio_active'
    // 获取添加的name的值
    let a = ev.target.getAttribute('name')
    this.setState({
      imgUrl: a,
      data: []
    })
    this.ajaxData('/ting/listByStyle.php?style=' + a + '&sort=1&pageNum=1&pageSize=9')
  }
  render () {
    let RadioTypeArray = this.state.data.map((item, index) => {
      return (
        <div key={index.toString()} className="recommend_ting">
          <a href={'tingInfo.html?tingid=' + item.tingid} target='blank'>
            <div className="recommend_img_wrap">
              <img src={item.imgUrl} className="recommend_img" />
              <div className="coverDiv" />
            </div>
          </a>
          <div className="recommend_ting_introduce">
            <a href={'tingInfo.html?tingid=' + item.tingid} target='blank'><p
              className="recommend_ting_name">{item.title}</p></a>
            <a href={'user.html?uid=' + item.userinfo.uid} target='blank'><p className="recommend_ting_anchor">主播/{item.userinfo.uname}</p></a>
            <span>{(item.plays / 1000).toFixed(1)}次播放 |</span>
            <span> 评论:{item.comments} | </span>
            <span> 喜欢:{item.likes}</span>
          </div>
        </div>
      )
    })
    return (
      <div className="radioType_wrap">
        <div className="radio_type_top">
          <div className="radio_type_loveImg">
            <img src={require('../../assets/images/radio-type' + this.state.imgUrl + '.png')} />
          </div>
          <div className='radioType_title_wrap'>
            <div className='radio_type_title'>
              分类:
              <a onClick={this.click} name={2} className="radio_title">故事</a>
              <a onClick={this.click} name={4} className="radio_title">音乐</a>
              <a onClick={this.click} name={6} className="radio_title">读诗</a>
              <a onClick={this.click} name={5} className="radio_title">电影</a>
              <a onClick={this.click} name={3} className="radio_title">旅行</a>
              <a onClick={this.click} name={1} className="radio_title">爱情</a>
            </div>
          </div>
        </div>
        <div className="radioType_ting_wrap">
          <div className="radioType_ting">
            {RadioTypeArray}
          </div>
        </div>
      </div>
    )
  }
}

export default RadioType
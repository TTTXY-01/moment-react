/**
 * Created by dllo on 17/8/25.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Slideshow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      styles: [
        {width: '640px', height: '375px', top: '0px', left: '150px', zIndex: 8},
        {width: '493px', height: '289px', top: '33px', left: '0px', zIndex: 6},
        {width: '410px', height: '240px', top: '53px', left: '300px', zIndex: 4},
        {width: '341px', height: '200px', top: '73px', left: '320px', zIndex: 2},
        {width: '256px', height: '150px', top: '93px', left: '50px', zIndex: 0},
        {width: '493px', height: '289px', top: '33px', left: '467px', zIndex: 6}
      ],
      className: ['active', '', '', '', '', '']
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
        console.log(response.data)
        this.setState({
          data: response.data
        })
      })
  }
  leftBtn = () => {
    let lastStyle = this.state.styles[this.state.styles.length - 1]
    let lastClassName = this.state.className[this.state.className.length - 1]
    // 点击左边 数组右轮
    for (let i = this.state.styles.length - 1; i > 0; i--) {
      this.state.styles[i] = this.state.styles[i - 1]
      this.state.className[i] = this.state.className[i - 1]
      if (i === 1) {
        this.state.styles[0] = lastStyle
        this.state.className[0] = lastClassName
        break
      }
    }
    // console.log(this.state.styles)
    this.setState({
      styles: this.state.styles,
      className: this.state.className
    })
  }
  rightBtn = () => {
    let firstStyle = this.state.styles[0]
    let firstClassName = this.state.className[0]
    // 点击右边 数组左轮
    for (let i = 0; i < this.state.styles.length; i++) {
      this.state.styles[i] = this.state.styles[i + 1]
      this.state.className[i] = this.state.className[i + 1]
      if (i === this.state.styles.length - 1) {
        this.state.styles[this.state.styles.length - 1] = firstStyle
        this.state.className[this.state.className.length - 1] = firstClassName
        break
      }
    }
    // console.log(this.state.styles)
    this.setState({
      styles: this.state.styles,
      className: this.state.className
    })
  }

  componentDidMount () {
    this.ajaxData('/pub/ad.php?type=3')
  }

  render () {
    return (
      <div className='slide-cpt'>
        <div className='left-btn' onClick={this.leftBtn}>&nbsp;</div>
        <div className='banner-img-box'>
          <ul className='img-group'>
            {
              this.state.data.map((item, index) => {
                return <li key={index.toString()} className={this.state.className[index]} style={this.state.styles[index]} data-index={index}>
                  <a href="###"><img src={item.img} /></a>
                </li>
              })
            }
          </ul>
        </div>
        <div className='right-btn' onClick={this.rightBtn}>&nbsp;</div>
      </div>
    )
  }
}

export default Slideshow

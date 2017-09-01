/**
 * Created by dllo on 17/8/30.
 */
import React, {Component} from 'react'
import Commentlist from './commentlist'
import Timelineinfohotlabel from './timelineinfohotlabel'

const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Timelineinfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      info: {},
      voice: ''
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
          data: response.data,
          info: response.data.userinfo
        })
        console.log(this.state.data)
        if (response.data.voice !== 0) {
          this.setState({
            voice: response.data.voice.match(/_[\d]+/g)[0]
          })
        }
      })
  }
  timeStr = (nS) => {
    let ymd = new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10).replace(/\//g, '-')
    let hm = new Date(parseInt(nS) * 1000).toString().substr(16, 5)
    return ymd + hm
  }

  componentDidMount () {
    this.ajaxData('/timeline/info.php?contentid=599d7a9c7b2aade60ac88b5a')
  }
  mouseOver = () => {
    document.getElementsByClassName('arrows-hover')[0].style.display = 'block'
  }
  mouseOut = () => {
    document.getElementsByClassName('arrows-hover')[0].style.display = 'none'
  }
  wecharOver = () => {
    document.getElementsByClassName('wechar-er')[0].style.display = 'block'
  }
  wecharOut = () => {
    document.getElementsByClassName('wechar-er')[0].style.display = 'none'
  }

  render () {
    return (
      <div className='timelineinfo clear-float'>
        <div className='timelineinfo-left float-left'>
          <div className='left-header clear-float'>
            <div className="left-header-left float-left">
              <a className='header-icon' href="#"><img src={this.state.info.icon} alt="" /></a>
              <a className='header-uname' href="#">{this.state.info.uname}</a>
            </div>
            <div className='left-header-right float-right'>
              <div className="float-left">{this.timeStr(this.state.data.addtime)}</div>
              <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className='float-left arrows'>&nbsp;
                <div className='arrows-hover'>举报</div>
              </div>
            </div>
          </div>
          <div className='left-content'>
            {
              this.state.data.coverimg === '' ? <span style={{display: 'none'}} /> : <img src={this.state.data.coverimg} />
            }
            <p className='left-text'>{this.state.data.text}</p>
            <div className="left-tag">
              {
                this.state.data.tag === '' ? <span style={{display: 'none'}} /> : <a className='left-tag-a' href="#">#{this.state.data.tag}#</a>
              }

            </div>
            {
              this.state.data.voice === '' ? <span style={{display: 'none'}} /> : <div className='voice'><div className="audio"><audio controls="controls" src={this.state.data.voice} className='voice-action'>&nbsp;</audio></div><div className='canvas' /><div className='voice-time'>{this.state.voice.replace('_', '')}''</div></div>
            }
            <div className='left-bottom clear-float'>
              <div className="left-bottom-left float-left">
                {this.state.data.likes}
              </div>
              <div className='left-bottom-right float-right'>
                <span className='sina'>&nbsp;</span>
                <span onMouseOver={this.wecharOver} onMouseOut={this.wecharOut} className='wechar'>&nbsp;</span>
                <img className='wechar-er' src={require('../../assets/images/wechar-er.png')} alt="" />
                <span className='Qzone'>&nbsp;</span>
                <span className='douban'>&nbsp;</span>
              </div>

            </div>
            <Commentlist id={this.state.data.id} />
          </div>
        </div>
        <div className='timelineinfo-right float-right'>
          <Timelineinfohotlabel />
        </div>
      </div>
    )
  }
}
export default Timelineinfo
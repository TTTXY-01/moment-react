/**
 * Created by dllo on 17/8/29.
 */
import React, {Component} from 'react'
import userImg from '../../assets/images/user-default-img.png'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Visitor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      minIndex: 0
    }
  }
  static propTypes = {
    spaceid: React.PropTypes.string
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
          data: this.state.data.concat(response.data)
        })
      })
  }
  // 滚轮事件
  scroll = () => {
    // console.log(document.body.scrollTop)
    // console.log(document.body.scrollHeight - document.documentElement.clientHeight)
    // 判断条件为 滚动到底部
    if (document.body.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight) {
      this.setState({
        minIndex: this.state.data.length - 1
      }, () => {
        let interFace = '/space/listOfVisitor.php' + location.search + '&minId=' + this.state.data[this.state.minIndex].id + '&spaceid=' + this.props.spaceid
        this.ajaxData(interFace)
      })
    }
  }
  componentDidMount() {
    let interFace = '/space/listOfVisitor.php' + location.search + '&minId=&spaceid=' + this.props.spaceid
    this.ajaxData(interFace)
    document.body.onscroll = this.scroll
  }
  render () {
    return (
      <div className='user-like-list'>
        {
          this.state.data.map((item, index) => {
            const desc = item.desc === '' ? '这是一个还没有简介的Pianker~' : item.desc
            const imgUrl = item.icon === '' ? userImg : item.icon
            return (
              <div className='user-like-cpt' key={index.toString()}>
                <div className='s-user-icon'>
                  <a href="###" target='_blank'>
                    <img src={imgUrl} alt="" />
                  </a>
                </div>
                <div className='s-user-info'>
                  <div className='s-user-name'><a href="###">{item.uname}</a></div>
                  <div className='s-user-des'>{desc}</div>
                </div>
                <div className='btn-focus'>关注</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Visitor
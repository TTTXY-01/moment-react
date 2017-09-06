/**
 * Created by dllo on 17/8/27.
 */
import React, {Component} from 'react'
import ReadListByHot from './ReadListByHot'
import ReadListByNew from './ReadListByNew'

const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class ArticleTagInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      Hot_New: true
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
        })
      })
  }
  // 切换new和hot的点击事件
  click = (e) => {
    let spanArr = document.querySelectorAll('.type-title-cpt>span')
    for (let i = 0; i < spanArr.length; i++) {
      spanArr[i].className = ''
    }
    e.target.className = 'type-active'
    if (e.target.innerHTML === 'NEW') {
      this.setState({
        Hot_New: false
      })
    } else {
      this.setState({
        Hot_New: true
      })
    }
  }

  componentDidMount () {
    // console.log(location.search)// 获取问号及其之后的参数
    // console.log(location.search.match(/^\?type=[\d]+/g)[0])
    let interFace = '/article/articleTagInfo.php' + location.search.match(/^\?type=[\d]+/g)[0]
    this.ajaxData(interFace)
  }

  render () {
    return (
      <div className='index-content'>
        <div className='article-type-info' style={{backgroundImage: 'url("' + this.state.data.img + '")'}}>
          <span>&nbsp;</span>
          <div className='article-type-title'>{this.state.data.typeName}</div>
          <div className='article-type-others'>{this.state.data.typeEnName}&nbsp;/&nbsp;{this.state.data.total}篇文章</div>
          <div className='article-type-des'>{this.state.data.desc}</div>
        </div>
        <div className='type-title-cpt'>
          <span onClick={this.click} className='type-active'>HOT</span>
          <span onClick={this.click}>NEW</span>
        </div>
        {
          this.state.Hot_New ? <ReadListByHot /> : <ReadListByNew />
        }
      </div>
    )
  }
}

export default ArticleTagInfo
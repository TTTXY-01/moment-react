import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Classification extends Component {
  constructor (poprs) {
    super(poprs)
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
        })
      })
  }

  componentDidMount () {
    this.ajaxData('/read/typeInfos.php?')
  }

  render () {
    return (
      <div>
        <div className='title-cpt'>分类&nbsp;&nbsp;|&nbsp;&nbsp;Classification</div>
        <div className='classification'>
          {
            this.state.data.map((item, index) => {
              return (
                <div key={index.toString()} className='article-type-cpt'>
                  <a href='###'>
                    <img src={item.img} className='type-img' alt="" />
                    <span className='type-bg'>&nbsp;</span>
                    <span className='type-title'>{item.typeName}</span>
                    <span className='type-des'>{item.typeEnName}/{item.total}篇</span>
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default Classification

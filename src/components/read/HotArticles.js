import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class HotArticles extends Component {
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
        console.log(response.data)
        this.setState({
          data: response.data
        })
      })
  }
  componentDidMount() {
    this.ajaxData('/read/listOfRecommendArticle.php?pageSize=3')
  }
  render () {
    return (
      <div>
        <div className='title-cpt'>热门文章&nbsp;&nbsp;|&nbsp;&nbsp;Hot Articles</div>
        <div className='text-content'>
          {
            this.state.data.map((item, index) => {
              return (
                <div className='article-cpt' key={index.toString()}>
                  <div className='article-info'>
                    <div className='article-info-box'>
                      <div className='article-title'>
                        <a href="###">{item.title}</a>
                      </div>
                      <div className='article-author'>
                        <a href="###">By&nbsp;/&nbsp;{item.userinfo.uname}</a>
                      </div>
                      <div className='article-content'>
                        {item.text}
                      </div>
                      <div className='article-others'>
                        {(item.views / 1000).toFixed(1)}&nbsp;k次阅读&nbsp;&nbsp;|&nbsp;&nbsp;
                        评论:{item.comments}&nbsp;&nbsp;|&nbsp;&nbsp;喜欢:{item.likes}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='free-writing'>
          <a href="###">
            <img src="http://qnstatic.pianke.me/public/assets/img/24hours.jpg" />
          </a>
        </div>
        <div className='topic'>
          <a href="###">
            <img src="http://qnstatic.pianke.me/public/assets/img/topic.jpg" />
          </a>
        </div>
        <div className='topic' style={{marginTop: 0}}>
          <a href="###">
            <img src="http://qnstatic.pianke.me/public/assets/img/wordcard.jpg" />
          </a>
        </div>
      </div>
    )
  }
}

export default HotArticles
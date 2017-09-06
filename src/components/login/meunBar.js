/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class MeunBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      uid: '',
      password: '',
      id: '',
      points: {},
      bodyData: '',
      contentid: ''
    }
  }
  // 请求用户登录数据
  ajaxData = (interFace) => {
    const time = new Date()
    // 2.根据当前时间, 进行格式化 yyyymmddHHMMss
    const timestamp = dateformat(time.getTime(), 'yyyymmddHHMMss')
    // 3.将字符串 0+''+timestamp 转成MD5, 并变为全大写
    const sig = md5('' + '' + timestamp).toUpperCase()
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
          data: response.data,
          uid: response.data.uid,
          password: response.data.password
        })
      })
  }
  // 请求发布的数据
  ajaxDataPublish = (interFace, bodyData) => {
    const time = new Date()
    // 2.根据当前时间, 进行格式化 yyyymmddHHMMss
    const timestamp = dateformat(time.getTime(), 'yyyymmddHHMMss')
    // 3.将字符串 0+''+timestamp 转成MD5, 并变为全大写
    let uid = this.state.uid === '' ? '' : this.state.uid
    let password = this.state.password === '' ? '' : this.state.password
    const sig = md5(uid + password + timestamp).toUpperCase()
    const Authorization = base64.btoa(uid + ':' + timestamp)
    const url = '/api' + interFace + '&sig=' + sig
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: bodyData
    })
      .then(response => {
        return response.json()
      })
      .then(response => {
        // console.log(response)
        this.setState({
          data: response.data,
          id: response.data.id,
          points: response.points
        })
      })
  }
  // 选择文章分类的点击事件
  classify = (e) => {
    let tagSpan = document.querySelector('.dropdownType>a>span')
    tagSpan.innerHTML = e.target.innerHTML
    let ul = document.querySelector('.dropdownType>ul')
    ul.style.display = 'none'
    let title = document.getElementById('title-input').value
    let content = document.getElementById('editor-text').value
    let tag = e.target.innerHTML
    let bodyData = 'title=' + title + '&type=1&content=' + content + '&tag=' + tag + '&firstimage=&editor=2&copyright=1&wordcardid=4561988'
    this.setState({
      bodyData: bodyData
    })
    console.log(bodyData)
    if (title === '') {
      alert('标题不能为空')
      return
    }
    this.ajaxDataPublish('/editor/add.php?', bodyData)
  }
  // 展示分类的点击事件
  showClassify = () => {
    let ul = document.querySelector('.dropdownType>ul')
    ul.style.display === 'none' ? ul.style.display = 'block' : ul.style.display = 'none'
  }
  // 点击发布事件
  clickPublish = () => {
    if (this.state.points.msg === '发布成功    +3') {
      let bodyData = 'status=1&type=15&id=' + this.state.id
      this.ajaxDataPublish('/editor/publish.php?', bodyData)
      this.setState({
        contentid: this.state.id
      })
    }
  }
  componentDidMount() {
    let mobile = document.cookie === '' ? '' : document.cookie.match(/mobile=\d+/g)[0].substr(7)
    let password = document.cookie === '' ? '' : document.cookie.match(/password=\d+/g)[0].substr(9)
    let interFace = '/user/login.php?mobile=' + mobile + '&pwd=' + password
    if (document.cookie !== '') {
      this.ajaxData(interFace)
    }
  }
  componentDidUpdate() {
    if (this.state.points.msg === '') {
      window.location.href = 'http://localhost:5000/articleInfo.html?contentid=' + this.state.contentid
    }
  }
  render () {
    return (
      <div>
        <div className="menuBar">
          <div className="logo">
            <a href="homepage.html">
              <img src={require('../../assets/images/logo.png')} alt="" />
            </a>
          </div>
          <div className="menuItem">
            <a href="###" className="active">文章</a>
            <a href="###">Ting</a>
          </div>
          <div className="userInfo">
            <div className="userIcon">
              <a href={'user.html?uid=' + this.state.data.uid}>
                <img src={this.state.data.icon} className="userIconWH" alt="" />
              </a>
            </div>
            <hr />
            <div className="dropdown">
              <a href="###" className="dropdown-toggle">账号</a>
            </div>
          </div>
        </div>
        <div className="container-bg">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <div className="newCollection">
                  <div className="newColl">
                    <img className='collectionIcon' src={require('../../assets/images/collection.png')} alt="" />
                    <span>创建片刊</span>
                  </div>
                </div>
                <div className="colItems">
                  <div className="colItem">未收录文章</div>
                </div>
              </div>
              <div className="col-sm-3 middleContent">
                <div className="newCollection">
                  <div className="newColl">
                    <img className='collectionIcon' src={require('../../assets/images/article.png')} alt="" />
                    <span>新建文章</span>
                  </div>
                </div>
                <div className="articleList">
                  <div className="articleItems">
                    <div className="articleItem">
                      <div className="ut-s">请输入文章标题</div>
                      <div className="articleTime">刚刚</div>
                    </div>
                  </div>
                  <div className="articleItems">
                    <div className="articleItem articleItemActive">
                      <div className="ut-s">孙晓桐的小黄书</div>
                      <div className="articleTime">a min ago</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="articlecontent">
                  <div className="ueditoButton">
                    <span className="preview">预览</span>
                    <span onClick={this.clickPublish}>更新发布</span>
                  </div>
                  <div className="articleTitle">
                    <div>
                      <input type="text" maxLength="30" id="title-input" />
                    </div>
                    <div className="titleWord"><span>0</span>/30</div>
                  </div>
                  <hr className="articleTitleHr" />
                  <div className="articleType">
                    <div className="dropdownType">
                      <a href="###" onClick={this.showClassify}>
                        <span>选择分类</span>
                        <img src={require('../../assets/images/downpoint.png')} alt="" />
                      </a>
                      <ul onClick={this.classify}>
                        <li>早安故事</li>
                        <li>晚安故事</li>
                        <li>生活范</li>
                        <li>奇妙物语</li>
                        <li>浮世汇</li>
                        <li>读心术</li>
                        <li>破万卷</li>
                        <li>审片室</li>
                        <li>诗</li>
                        <li>片刻Talk</li>
                        <li>在路上</li>
                        <li>角儿</li>
                        <li>视觉系</li>
                        <li>片刻趴</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ueditorContent">
                    <div id="editor">
                      <div id="editor_toolbar_box">
                        <div id="editor_toolbar">
                          <div><img src={require('../../assets/images/bold.png')} alt="" /></div>
                          <div><img src={require('../../assets/images/italic.png')} alt="" /></div>
                          <div><img src={require('../../assets/images/underline.png')} alt="" /></div>
                        </div>
                      </div>
                      <textarea id="editor-text" cols="30" rows="10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MeunBar

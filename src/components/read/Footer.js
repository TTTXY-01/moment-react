import React, {Component} from 'react'
import appImg from '../../assets/images/foot-app.png'
import appHImg from '../../assets/images/foot-appH.png'
import sinaImg from '../../assets/images/foot-sina.png'
import sinaHImg from '../../assets/images/foot-sinaH.png'
import wechatImg from '../../assets/images/foot-wechat.png'
import wechatHImg from '../../assets/images/foot-wechatH.png'

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      display: {display: 'none'},
      imgUrl: [appImg, sinaImg, wechatImg]
    }
  }
  mouseover1 = () => {
    this.setState({
      imgUrl: [appHImg, sinaImg, wechatImg]
    })
  }
  mouseout1 = () => {
    this.setState({
      imgUrl: [appImg, sinaImg, wechatImg]
    })
  }
  mouseover2 = () => {
    this.setState({
      imgUrl: [appImg, sinaHImg, wechatImg]
    })
  }
  mouseout2 = () => {
    this.setState({
      imgUrl: [appImg, sinaImg, wechatImg]
    })
  }
  mouseover3 = () => {
    this.setState({
      imgUrl: [appImg, sinaImg, wechatHImg],
      display: {display: 'block'}
    })
  }
  mouseout3 = () => {
    this.setState({
      imgUrl: [appImg, sinaImg, wechatImg],
      display: {display: 'none'}
    })
  }
  render () {
    return (
      <footer>
        <div id="foot">
          <div id="foot-logo">&nbsp;</div>
          <div id="foot-link">
            <span>
              <a href="http://old.pianke.me/public/aboutus.php" target='_blank'>关于我们</a>
              <a href="http://old.pianke.me/public/link.php" target='_blank'>友情链接</a>
              <a href="http://old.pianke.me/public/help.php" target='_blank'>片刻帮助</a>
              <a href="http://old.pianke.me/public/feedback.php" target='_blank'>意见反馈</a>
              <a href="http://old.pianke.me/album/52a83abd7f8b9ab50d00000d" target='_blank'>成长记忆</a>
            </span>
            <span>All rights reserved © 2016 pianke.me /蜀ICP备12022689号-1</span>
          </div>
          <div id="foot-icon">
            <a href="###" onMouseOut={this.mouseout1} onMouseOver={this.mouseover1}><img className="app-icon" src={this.state.imgUrl[0]} alt="" /></a>
            <a href="http://weibo.com/u/2848708205" target='_blank' onMouseOut={this.mouseout2} onMouseOver={this.mouseover2}><img className="app-icon" src={this.state.imgUrl[1]} alt="" /></a>
            <a href="###" id="wechat" onMouseOut={this.mouseout3} onMouseOver={this.mouseover3}><img className="app-icon" src={this.state.imgUrl[2]} alt="" /><img id="ewCode" style={this.state.display} src={require('../../assets/images/pianke-code.png')} alt="" /></a>
            <a href="###"><img id="safe-icon" src={require('../../assets/images/foot-safe.png')} alt="" /></a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
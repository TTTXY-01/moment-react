import React, {Component} from 'react'

class ClientSide extends Component {
  mouseOver = () => {
    document.getElementsByClassName('clientSide-codeH')[0].style.display = 'block'
  }
  mouseOut = () => {
    document.getElementsByClassName('clientSide-codeH')[0].style.display = 'none'
  }
  mouseOver1 = () => {
    document.getElementsByClassName('clientSide-codeH')[1].style.display = 'block'
  }
  mouseOut1 = () => {
    document.getElementsByClassName('clientSide-codeH')[1].style.display = 'none'
  }
  render () {
    return (
      <div className='clientSide'>
        <div className="clientSide-header">
          <div className="clientSide-header-content">
            <p>世界很美, <br /> 而你正好有空。</p>
            <p className='clientSide-header-p2'>Stay with me，look around the world － 片刻V5.0</p>
            <div className='clientSide-header-btn'>
              <a className='clientSide-ios' href="https://itunes.apple.com/us/app/pian-ke/id791086961?mt=8">ios下载</a>
              <a className='clientSide-android' href="https://qnstatic.pianke.me/apk/pianke_v5.0.5_pianke.apk">Android</a>
              <img onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className='clientSide-code' src={require('../../assets/images/client-img/client-code.png')} alt="" />
              <img className='clientSide-codeH' src={require('../../assets/images/client-img/client-codeH.png')} alt="" />
            </div>
          </div>
        </div>
        <div className='clientSide-content'>
          <div className='clientSide-center'>
            <div className="clientSide-content1">
              <div className='clientSide-content1-title'>
                <p className="clientSide-content1-title-p1"><span>01</span>白+黑模式</p>
                <p className="clientSide-content1-title-p2">白天阅读、夜晚聆听，
                  <br />
                  不同的时间就是要有不同的享受。
                </p>
              </div>
              <div className="clientSide-content1-img">
                <img src={require('../../assets/images/client-img/client1.png')} alt="" />
              </div>

            </div>
            <div className='clientSide-content2 clear-float'>
              <img className='float-left' src={require('../../assets/images/client-img/client3.png')} alt="" />
              <div className=' clientSide-content2-right float-right'>
                <div className='clientSide-content2-title'>
                  <p className="clientSide-content2-title-p1"><span>02</span>直播</p>
                  <p className="clientSide-content2-title-p2">夜阑人静，给你最美的声音和故事
                  </p>
                </div>
              </div>
            </div>
            <div className='clientSide-content3 clear-float'>
              <div className=' clientSide-content3-right float-left'>
                <div className='clientSide-content3-title'>
                  <p className="clientSide-content3-title-p1"><span>03</span>片刻社区</p>
                  <p className="clientSide-content3-title-p2">随心所欲的诉说，等你来和应
                  </p>
                </div>
              </div>
              <img className='float-right' src={require('../../assets/images/client-img/client4.png')} alt="" />
            </div>
            <div className='clientSide-content2  clear-float'>
              <img className='float-left' src={require('../../assets/images/client-img/client5.png')} alt="" />
              <div className=' clientSide-content2-right float-right'>
                <div className='clientSide-content2-title'>
                  <p className="clientSide-content2-title-p1"><span>04</span> <br />生活馆，造有情之物</p>
                  <p className="clientSide-content2-title-p2">生活不只诗和远方，还有对美好事物的拥有
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='clientSide-content-footer'>
          <div className='clientSide-content-footer-center'>
            <p>
              文字，电台，音乐，好物，满足你所有关于美好事物的想象。
              五个版本的更迭，片刻已经陪伴无数人度过了他们的孤单的时刻，
              如果你也有想表达的，在这里，永远有人在关注你。
            </p>
            <div className='clientSide-content-footer-btn'>
              <a className='clientSide-ios' href="https://itunes.apple.com/us/app/pian-ke/id791086961?mt=8">ios下载</a>
              <a className='clientSide-android' href="https://qnstatic.pianke.me/apk/pianke_v5.0.5_pianke.apk">Android</a>
              <img onMouseOver={this.mouseOver1} onMouseOut={this.mouseOut1} className='clientSide-code' src={require('../../assets/images/client-img/client-code.png')} alt="" />
              <img className='clientSide-codeH' src={require('../../assets/images/client-img/client-codeH.png')} alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClientSide
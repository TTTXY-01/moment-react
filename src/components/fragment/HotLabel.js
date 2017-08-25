/**
 * Created by dllo on 17/8/24.
 */
import React, {Component} from 'react'

class HotLabel extends Component {
  constructor (porps) {
    super(porps)
    this.state = {
      scale: 'scale(1)'
    }
  }

  onmouseover = (ev) => {
    ev.target.style.transform = 'scale(1.1)'
    console.log(ev.target)
  }

  render () {
    const arr = []
    for (var i = 0; i < 12; i++) {
      arr.push(
        <div onMouseOver={this.onmouseover} className='hotLabel-content-one'>
          <a>
            <img className='img' src={require('./../../assets/images/timg.jpg')} />
            <div className='hotLabel-content-one-text'>
              <div>悄悄话</div>
              <div>75931个</div>
            </div>
          </a>
        </div>
      )
    }

    return (
      <div className='hotLabel'>
        <div className='hotLabel-title'>
          热门标签
        </div>
        <div className='hotLabel-content'>
          {arr}
        </div>
      </div>
    )
  }
}
export default HotLabel

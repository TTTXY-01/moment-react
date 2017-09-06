/**
 * Created by dllo on 17/8/26.
 */
import React, {Component} from 'react'
import WriteListByHot from './WriteListByHot'
import WriteListByNew from './WriteListByNew'

class WriteNotes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Hot_New: true
    }
  }
  // hot/new切换的点击事件
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
  render () {
    return (
      <div className='index-content'>
        <div className='title-cpt type-24'>24小时自由写作</div>
        <div className='type-title-cpt'>
          <span onClick={this.click} className='type-active'>HOT</span>
          <span onClick={this.click}>NEW</span>
        </div>
        {
          this.state.Hot_New ? <WriteListByHot /> : <WriteListByNew />
        }
      </div>
    )
  }
}

export default WriteNotes
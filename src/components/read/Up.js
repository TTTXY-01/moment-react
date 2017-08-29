/**
 * Created by dllo on 17/8/26.
 */
import React, {Component} from 'react'

class Up extends Component {
  backTop = () => {
    document.body.scrollTop = 0
  }
  render () {
    return (
      <div>
        <div className="backTop" onClick={this.backTop}>&nbsp;</div>
      </div>
    )
  }
}

export default Up
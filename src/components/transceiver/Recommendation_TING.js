import React, { Component } from 'react'
const md5 = require('md5')
const dateformat = require('dateformat')
const base64 = require('Base64')

class Recommendation extends Component {
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
        console.log(response)
        this.setState({
          data: response.data
        })
      })
  }
  componentDidMount () {
    this.ajaxData('/ting/listOfRecommend.php?pageSize=3')
  }
  render() {
    return (
      <div>
        {
          this.state.data.map(function (item, index) {
            return (
              <div>
                <p key={index.toString()}>{item.title}</p>
              </div>
          )
          })
        }
      </div>
    )
  }
}

export default Recommendation
import React, { Component } from 'react'
class RadioType extends Component {
  render () {
    return (
      <div className='type_wrap'>
        <div className='radio_type'>
          <a href='###'>
            <img className='radio_love' src={require('../../assets/images/radio-type-love.png')} />
            <span>爱情</span>
          </a>
        </div>
        <div className='radio_type'>
          <a href='###'>
            <img className='radio_trip' src={require('../../assets/images/radio-type-trip.png')} />
            <span>旅行</span>
          </a>
        </div>
        <div className='radio_type'>
          <a href='###'>
            <img className='radio_story' src={require('../../assets/images/radio-type-story.png')} />
            <span>故事</span>
          </a>
        </div>
        <div className='radio_type'>
          <a href='###'>
            <img className='radio_music' src={require('../../assets/images/radio-type-music.png')} />
            <span>音乐</span>
          </a>
        </div>
        <div className='radio_type'>
          <a href='###'>
            <img className='radio_movie' src={require('../../assets/images/radio-type-movie.png')} />
            <span>电影</span>
          </a>
        </div>
        <div className='radio_type'>
          <a href='###'>
            <img className='radio_poetry' src={require('../../assets/images/radio-type-poetry.png')} />
            <span>读诗</span>
          </a>
        </div>
      </div>
    )
  }
}
export default RadioType

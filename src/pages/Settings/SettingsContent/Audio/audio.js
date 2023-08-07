import React, { useState } from 'react'
import ReactSlider from 'react-slider'
import './audio.scss'

function Audio() {
  const [masterVolume, setMasterVolume] = useState(10)
  const [musicVolume, setMusicVolume] = useState(10)
  const [sfxVolume, setSfxVolume] = useState(10)
  return (
    <div className='audio-container'>
      <h2 className='custom-border-bottom type-long mb-5'>
        Master Audio Settings
      </h2>
      <div className='audio-control-panel'>
        <h2>Volumn</h2>
        <div className='audio-slider'>
          <img src='/images/Icon_Music.png' alt='music' className='music' />
          <h2>-</h2>
          <ReactSlider
            className='horizontal-slider'
            thumbClassName='slider-thumb'
            trackClassName='slider-track'
            value={masterVolume}
            min={0}
            max={20}
            onChange={(value) => setMasterVolume(value)}
          />
          <h2>+</h2>
        </div>
      </div>
      <h2 className='custom-border-bottom type-long mb-5 mt-4'>Audio Balance</h2>
      <div className='audio-control-panel mb-3'>
        <h2>Music Volume</h2>
        <div className='audio-slider'>
          <img src='/images/Icon_Music.png' alt='music' className='music' />
          <h2>-</h2>
          <ReactSlider
            className='horizontal-slider'
            thumbClassName='slider-thumb'
            trackClassName='slider-track'
            value={musicVolume}
            min={0}
            max={20}
            onChange={(value) => setMusicVolume(value)}
          />
          <h2>+</h2>
        </div>
      </div>
      <div className='audio-control-panel'>
        <h2>SFX Volume</h2>
        <div className='audio-slider'>
          <img src='/images/Icon_Music.png' alt='music' className='music' />
          <h2>-</h2>
          <ReactSlider
            className='horizontal-slider'
            thumbClassName='slider-thumb'
            trackClassName='slider-track'
            value={sfxVolume}
            min={0}
            max={20}
            onChange={(value) => setSfxVolume(value)}
          />
          <h2>+</h2>
        </div>
      </div>
      <h2 className='custom-border-bottom type-long mb-5 mt-4'>Other Settings</h2>
      <div className='audio-control-panel'>
        <h2>Output</h2>
        <div className='audio-dropdown'>
          Stereo Sound
          <img src='/images/v2/accordian-collapsed.png' alt='arrow down' />
        </div>
      </div>
    </div>
  )
}

export default Audio

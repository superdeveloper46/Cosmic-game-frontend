import React from "react"
import CloseButton from "../CloseButton"
import NormalButton from "../NormalButton"

const VideoPlayer = ({
  info,
  onClose,
}) => {
  return (
    !!info
    ? <div 
      className="video-player-wrapper" 
      style={{ 
        backgroundImage: !!info.background ? `url(${info.background})` : undefined,
        width: `${info.width || 300}px`,
        hegith: `${info.hegith || 300}px`,
      }}
    >
      {
        !!info.title || !!info.isCloseEnabled
        ? <div className="video-player-header">
          { 
            info.title || ''
          }
          {
            !!info.isCloseEnabled
            ? <CloseButton onClick={ onClose }/>
            : null
          }
          </div>
        : null
      }
      {
        !!info.video
        ? <div className="video-player-content text-center">
          <video 
            src={ info.video } 
            autoPlay={ !!info.autoplay } 
            width={ info.width || 300 }
            height={ info.height || 300 }
            onEnded={() => {
              if (!!info.closeAfterPlay) {
                onClose()
              }
            }}
          />
        </div>
        : null
      }
      {
        (info.actions || []).length > 0
        ? <div className="video-player-actions">
          {
            info.actions.map(action => (
              <NormalButton style={{ filter: 'hue-rotate(180deg) brightness(0.7)', minWidth: '120px' }} onClick={ action.action }>
                { action.label }
              </NormalButton>
            ))
          }
        </div>
        : null
      }
    </div>
    : null
  )
}

export default VideoPlayer
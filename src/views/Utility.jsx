import React from 'react'

const Utility = ({ data, addMin, subMin, handlePlay, handleReset, handleStop }) => {
  return (
    <>
      <div id="main">
        <header id="header"><h1>25 + 5 Clock</h1></header>
        <div id="content">
          <div id="break-label">Break Length
            <div className="left-right" >
              <i className="fas fa-arrow-down" id="break-decrement" onClick={e => subMin(e)}></i>
              <div id="break-length">{data.breakChange}</div>
              <i className="fas fa-arrow-up" id="break-increment" onClick={e => addMin(e)} ></i>
            </div>
          </div>

          <div id="session-label" >Session Length
            <div className="left-right">
              <i className="fas fa-arrow-down" id="session-decrement" onClick={e => subMin(e)} ></i>
              <div id="session-length">{data.sessionChange} </div>
              <i className="fas fa-arrow-up" id="session-increment" onClick={e => addMin(e)}></i>
            </div>
          </div>
        </div>
        <div id="bottom">
          <div id="timer-label">{data.breakRunning ? "Break" : 'Session'}
            <div style={{ color: (data.mins < 1 && data.secs < 60) || (data.break < 1 && data.secs > 60) ? 'red' : 'black' }} id="time-left">
         {
           `${data.breakRunning ? `${0} ${data.break}` : data.mins < 10 ? `${0} ${data.mins}` : data.mins} : ${data.seconds < 10 && data.seconds !== '00' ? `${0} ${data.seconds}` : data.seconds}` 
         }
           </div>
          </div>
        </div>
        <div id="start_stop">
          <i id="play" className="fas fa-play" onClick={e => handlePlay(e)}></i>
          <i id="pause" className="fas fa-pause" onClick={e => handleStop(e)}></i>
          <i id="reset" className="fas fa-recycle" onClick={e => handleReset(e)}></i>
          <audio id='beep' src='./Beep' ></audio>
        </div>
      </div>

    </>
  )
};

export default Utility

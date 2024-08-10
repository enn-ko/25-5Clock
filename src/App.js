
import { faCircleArrowDown, faCircleArrowUp, faPauseCircle, faPlayCircle, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


function App() {
  const [breakLength,setBreakLength] = useState(5)
  const [sessionLength,setSessionLength] = useState(25)
  const [timeLeft,setTimeLeft] = useState(1500)
  const [timingType,setTimingType] = useState("SESSION")
  const [play,setPlay] = useState(false)

  const timeOut = setTimeout(()=>{
    if(timeLeft && play){
      setTimeLeft(timeLeft-1)
    }
  },1000)


  const timeFormater = ()=>{
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formatMinutes = minutes < 10 ? "0" + minutes : minutes
    const formatSeconds = seconds < 10 ? "0" + seconds : seconds
    return (`${formatMinutes} : ${formatSeconds}`)
  }

  const handlePlay = ()=>{
    clearTimeout(timeOut);
    setPlay(!play)
  }

  const handleReset = ()=>{
    clearTimeout(timeOut);
    setBreakLength(5)
    setSessionLength(25)
    setTimeLeft(1500)
    setTimingType("SESSION")
    setPlay(false)
    const audio = document.getElementById('audio')
    audio.pause()
    audio.currentTime = 0
  }
  
  const resetTimer = ()=>{
    const audio = document.getElementById('audio')
    if(!timeLeft && timingType === "SESSION"){
      setTimingType("BREAK")
      setTimeLeft(breakLength * 60)
      audio.play()
    }
  if(!timeLeft && timingType === "BREAK"){
    setTimingType("SESSION")
    setTimeLeft(sessionLength * 60)
    audio.pause()
    audio.currentTime = 0
  }
  }

  const clock = ()=>{
    if(play){
      timeOut()
      resetTimer()
    }else{
      clearTimeout(timeOut)
    }
  }

useEffect(()=>{ 
  clock()

},[play,timeOut, timeLeft])

  const handleBreakDec = ()=>{
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }

  const handleBreakInec = ()=>{
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }

  const handleSessionDec = ()=>{
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 60)
    }
  }
  const handleSessionInec = ()=>{
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 60)
    }
  }
  const title = timingType === "SESSION" ? "Session" : "Break"
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen h-screen bg-gray-800 text-white">
      <h2 className="text-5xl mb-10 border rounded px-16 py-2 bg-blue-900">25 + 5 Clock</h2>
      <div className="grid grid-cols-2 gap-36">
      <div id="break-label" className="flex flex-col gap-8 items-center">
        <h2 className="text-3xl text-gray-400">Break Length</h2>
      <div className="grid grid-cols-3 items-center gap-6">
      <button disabled={play} onClick={handleBreakDec} className="text-4xl" id='break-decrement'>
         <FontAwesomeIcon icon={faCircleArrowDown} />
        </button>
        <h2 className="text-3xl border rounded px-4 bg-gray-900" id="break-length">{breakLength}</h2>
        <button disabled={play} onClick={handleBreakInec} className="text-4xl" id="break-increment">
          <FontAwesomeIcon icon={faCircleArrowUp} />
        </button>
      </div>
      </div>
      <div id="session-label" className="flex flex-col gap-8 items-center">
      <h2 className="text-3xl text-gray-400">Session Length</h2>
       <div className="grid grid-cols-3 items-center gap-6">
       <button disabled={play} onClick={handleSessionDec} className="text-4xl" id='session-decrement'>
         <FontAwesomeIcon icon={faCircleArrowDown} />
        </button>
        <h2 className="text-3xl border rounded px-4 bg-gray-900" id="session-length">{sessionLength}</h2>
        <button  disabled={play} onClick={handleSessionInec} className="text-4xl" id="session-increment">
          <FontAwesomeIcon icon={faCircleArrowUp} />
        </button>
       </div>
      </div>
      </div>
      <div className="mt-3 p-8 border grid gap-5 rounded ">
        <div className="text-4xl grid gap-6">
          <h2 id="time-label">{title}</h2>
          <h2 id="time-left">{timeFormater()}</h2>
        </div>
        <div className=" grid grid-cols-2 text-4xl items-center justify-center">
          <button  id="start_stop" onClick={handlePlay}>
            <FontAwesomeIcon icon={play ? faPauseCircle : faPlayCircle} />
          </button>
          <button id="reset" onClick={handleReset}x>
            <FontAwesomeIcon icon={faRefresh} />
          </button>
        </div>
      </div>
      <audio id="audio"
       preload="auto"
       src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default App;

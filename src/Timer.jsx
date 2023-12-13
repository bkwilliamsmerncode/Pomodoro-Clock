import React, { useState, useEffect, useCallback } from 'react'
import Utility from "./views/Utility"
import sound from "./views/sound.wav"
import './App.css';


function Timer() {
    const [data, setData] = useState({
        sessionChange: 25,
        breakChange: 5,
        breakSession: 5,
        break: 5,
        interval: 0,
        mins: 25,
        minutes: 0,
        secs: 60,
        sessionTime: 0,
        seconds: "00",
        sessionRunnning: false,
        breakRunning: false,
        playing: false,
        paused: false
    })

    const [previous, setPrevious] = useState(null)
    const [reset, setDefault] = useState(data)



    useEffect(() => {
        if (!data.playing && !data.paused)
            setPrevious(data)

    }, [data])

    useEffect(() => {
        setPrevious(data)

    }, [data.breakChange, data.sessionChange])

    const addMin = (e) => {
        if (e.target.id === "break-increment" && data.break < 5) {
            setData(prev => ({
                ...prev,
                break: prev.break < 5 ? prev.break + 1 : prev.break,
                breakChange: prev.breakChange < 5 ? parseInt(prev.breakChange) + 1 : prev.breakChange,
            }))
        } else if (e.target.id === 'session-increment') {
            setData(prev => ({
                ...prev,
                mins: parseInt(prev.mins) < 60 ? parseInt(prev.mins) + 1 : prev.mins,
                sessionChange: prev.sessionChange < 60 ? parseInt(prev.sessionChange) + 1 : prev.sessionChange
            }))
        }
    }

    const subMin = (e) => {
        if (e.target.id === "break-decrement") {
            setData(prev => ({
                ...prev,
                break: prev.break > 1 ? prev.break - 1 : prev.break,
                breakChange: prev.breakChange > 1 ? parseInt(prev.breakChange) - 1 : prev.breakChange,
            }))
        } else if (e.target.id === "session-decrement") {
            setData(prev => ({
                ...prev,
                mins: parseInt(prev.mins) > 1 ? parseInt(prev.mins) - 1 : prev.mins,
                sessionChange: prev.sessionChange > 1 ? parseInt(prev.sessionChange) - 1 : prev.sessionChange
            }))
        }
    }


    const handlePlay = () => {
        if (!data.sessionRunning && !data.playing && !data.breakRunning) {
            myTimer()
        } else if (data.paused && data.sessionRunning && !data.playing) {
            myTimer()
        } else if (data.paused && data.brreakRunning && !data.playing) {
            myBreak()
        }
    }

    useEffect(() => {
        if (data.paused) {
            setData(prev => ({
                ...prev,
                interval: prev.interval
            }))
        }
    }, [data.paused])


    const myTimer = useCallback(() => {
        let myInterval = setInterval(() => {
            setData(prev => {
                return {
                    ...prev,
                    secs: prev.secs <= 60 && prev.secs > 1 ? prev.secs - 1 : 60,
                    seconds: prev.secs - 1,
                    interval: myInterval,
                    mins: prev.secs === 60 && prev.mins > 0 ? prev.mins - 1 : prev.mins,
                    sessionRunning: true,
                    breakRunning: false,
                    playing: true,
                    paused: false,

                }
            })
        }, 1000)
    }, [data.secs])

    const myBreak = useCallback(() => {
        let myInterval2 = setInterval(() => {
            setData(prev => {
                return {
                    ...prev,
                    secs: prev.secs <= 60 && prev.secs > 1 ? prev.secs - 1 : 60,
                    seconds: prev.secs - 1,
                    interval: prev.myinterval2,
                    break: prev.secs === 60 && prev.break > 0 ? prev.break - 1 : prev.break,
                    mins: prev.break,
                    sessionRunning: false,
                    breakRunning: true,
                    playing: true,
                    paused: false
                }
            })
        }, 1000);
    }, [])

    useEffect(() => {
        if (data.mins === 0 && data.seconds === 0 && !data.breakRunnung) {
            clearInterval(data.interval)
            new Audio(sound).play()
            setTimeout(() => {
                setData(prev => ({
                    ...prev,
                    breakRunning: true,
                    sessionRunning: false,
                    break: prev.breakChange,
                    breakSession: prev.breakSession,
                    playing: false,
                    paused: false,
                    seconds: '00',
                    sessionChange: previous.sessionChange,
                    sessionTime: NaN,
                    secs: 60,
                    mins: previous.breakChange,
                    minutes: previous.minutes,
                    interval: previous.interval
    }))
    myBreak()
            }, 2000)
        }
    }, [data.mins, data.seconds, data.interval, data.sessionRunning, myBreak, previous, data])

    useEffect(() => {
        if(data.mins === 0 && data.seconds === 0 && !data.sessionRunnning) {
            clearInterval(data.interval)
            setTimeout(() => {
                setData(prev => ({
                    ...prev, 
                    breakRunning: false, 
                    sessionRunnning: true, 
                    break: previous.breakChange, 
                    breakSession: previous.breakSession, 
                    playing: false, 
                    paused: false, 
                    seconds: '00', 
                    sessionChange: previous.sessionChange, 
                    sessionTime: NaN, 
                    secs: 60, 
                    mins: previous.sessionChange, 
                    minutes: previous.minutes, 
                    interval: previous.interval
                }))
                myTimer()
            }, 2000)
        }
    }, [data.mins, data.seconds, data.interval, data.breakRunning, previous, myTimer, data.sessionRunnning])

    const handleStop = () => {
        if(data.sessionRunning && !data.breakRunning) {
            setData(prev => ({
                ...prev, 
                playing: false, 
                paused: true, 

            }))
            clearInterval(data.interval)
        }
    }

    const handleReset = () => {
        clearInterval(data.interval)
        setData(reset)
    }

    useEffect(() => {
        setData(prev => ({
            ...prev, 
            sessionTime:prev.session * 60 * 1000
        }))
    }, [data.breakSession, data.session])
    return (
        <>
            <Utility data={data} addMin={addMin} subMin={subMin} handlePlay={handlePlay} handleStop={handleStop} handleReset={handleReset} sound={sound} />
        </>
    );
}

export default Timer;

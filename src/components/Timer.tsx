import { useState, useEffect } from "react"


export const Timer = () => {

    const [time, setTime] = useState({minutes: 0, seconds: 0});
    const [isActive, setIsActive] = useState (false)

    useEffect(() => {
        let interval:NodeJS.Timeout | undefined;

        if(isActive) {
            interval = setInterval (() => {
                if(time.seconds === 59) {
                    setTime({minutes:time.minutes +1, seconds: 0})
                } else {
                    setTime ({...time, seconds: time.seconds +1})
                }
            }, 1000);
        } else if (!isActive && time.seconds !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval);
     }, [isActive, time])

     const toggleTimer = () => {
        setIsActive(!isActive)
     }

     const resetTimer = () => {
        setIsActive(false)
        setTime({minutes:0, seconds:0})
     }

    return (
        <div className="timer">
            <div className="timerNum">
                {String(time.minutes).padStart(2, '0')}: {String(time.seconds).padStart(2, '0')}
            </div>
            <div className="timerBtn-container">
                <button onClick={toggleTimer} className="timerBtn">{isActive ? 'Pause' : 'Start'}</button>
                <button onClick={resetTimer} className="timerBtn">Reset</button>
            </div>
        </div>
    )
}

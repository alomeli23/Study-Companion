import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [lastSession, setLastSession] = useState(false)

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() =>{
                setSeconds((seconds) => seconds+1)
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [isRunning]) //dependency array (run whenever isRunning changes)

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60


    const handleTimer = () => {
        if(isRunning) {
            setIsRunning(false)
            if(seconds < 5){
                setSeconds(0)
            }
            else {
                const session = {
                    durationSeconds: seconds
                }

                fetch('http://localhost:8080/api/sessions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(session)
                })

                setLastSession(seconds)
                setSeconds(0)
            }
        }
        else{
            setIsRunning(true)
        }
    }

    return (
        <>
            <h1>Study-Companion</h1>
            <p>{String(minutes).padStart(2,'0')}:
                {String(remainingSeconds).padStart(2,'0')}
            </p>
            <button onClick={handleTimer}></button>

            <p>Last Session: {lastSession} seconds</p>
        </>
    )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
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

    return (
        <>
            <h1>Study-Companion</h1>
            <p>{String(minutes).padStart(2,'0')}:
                {String(remainingSeconds).padStart(2,'0')}
            </p>
            <button onClick={() =>
                setIsRunning(!isRunning)}>
                Start
            </button>
            <p>{isRunning? 'Stop' : 'Start'}</p>
        </>
    )
}

export default App

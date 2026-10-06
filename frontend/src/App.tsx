import { useEffect, useState } from 'react'
import './App.css'

type StudySession = {
    id: number
    durationSeconds: number
}
function App() {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [lastSession, setLastSession] = useState(0)
    const [sessions, setSessions] = useState<StudySession[]>([])




    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() =>{
                setSeconds((seconds) => seconds+1)
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [isRunning]) //dependency array (run whenever isRunning changes)

    useEffect(() => {
        fetch('http://localhost:8080/api/sessions')
            .then(response => response.json())
            .then(data => setSessions(data))

    }, [])

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const totalStudyTime = sessions.reduce((total, session) => {
        return total + session.durationSeconds
    }, 0)
    const totalMinutes = Math.floor(totalStudyTime/60)


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
                    .then(response => response.json())
                    .then(savedSession => {
                        setSessions((sessions) => [...sessions, savedSession])
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
            <p>Total Study Time: {totalMinutes} minutes</p>
            <h2>Recent Sessions</h2>
            {sessions.map((session) => (
                <p key={session.id}>
                    {session.durationSeconds} seconds
                </p>
            ))}
        </>
    )
}

export default App

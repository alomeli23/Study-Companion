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
    const [companionMessage, setCompanionMessage] = useState('')
    const [isPopping, setIsPopping] = useState(false)


    useEffect(() => {
        if (isRunning) {
            const interval  = setInterval(() => {

                if(localStorage.getItem("studyStartTime") != null) {
                    const time = Number(localStorage.getItem("studyStartTime"))
                    const elapsedTime = Math.floor((Date.now() - time) / 1000);
                    setSeconds(elapsedTime)

                }

                },1000)


                return () => clearInterval(interval)
        }
    }, [isRunning]) //dependency array (run whenever isRunning changes)


    useEffect(() => {
        if(localStorage.getItem("studyStartTime") != null){
            const time = Number(localStorage.getItem("studyStartTime"))
            const elapsedTime = Math.floor((Date.now() - time)/1000);
            setSeconds(elapsedTime)
            setIsRunning(true)
        }

    }, [])


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
    const totalXP = Math.floor(totalStudyTime/60)

    const companionImages: Record<string, string> = {
        Egg: '/companions/egg.png',
        Baby: '/companions/baby.png',
        Medium: '/companions/medium.png',
        Adult: '/companions/adult.png'
    }

    const companionPopImages: Record<string, string> = {
        Egg: '/companions/eggpop.png',
        Baby: '/companions/babypop.png',
        Medium: '/companions/medpop.png',
        Adult: '/companions/adultpop.png'
    }

    const eggMessages = [
        "Crack! It can feel your focus!",
        'Crack open a book, and crack open the shell!',
        'Your studying is like a lullaby!'
    ]

    const babyMessages = [
        'We got dis! :3',
        "U can do it! cheering for u!",
        "(✿◠‿◠)"
        ]
    const medMessages = [
        "You're doing so well!",
        "Don't forget to take breaks!",
        'One more session!'
    ]
    const adultMessages = [
        "It always seems impossible until it's done.",
        'The secret of getting ahead is getting started.',
        'It does not matter how slowly you go as long as you do not stop.'
    ]

    let growthStage = 'Egg'
    if (totalXP >= 1500) {
        growthStage ='Adult'
    } else if (totalXP >= 300) {
        growthStage = 'Medium'
    } else if (totalXP >= 60) {
        growthStage = 'Baby'
    }

    const handleCompanionClick = () => {
        let messages = eggMessages
        setIsPopping(true)
        switch (growthStage) {
            case 'Baby':
                messages = babyMessages
                break
            case 'Medium':
                messages = medMessages
                break
            case 'Adult':
                messages = adultMessages
                break
        }
        const randomIndex = Math.floor(Math.random() * messages.length)
        setCompanionMessage(messages[randomIndex])
    }


    const handleTimer = () => {
        if(isRunning) {
            setIsRunning(false)
            localStorage.removeItem("studyStartTime")

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
            const startTime = Date.now()
            localStorage.setItem("studyStartTime", String(startTime))

        }
    }

    return (
        <>
            <h1>Study-Companion</h1>
            <p>Growth Stage: {growthStage}</p>
            <button
                onClick={handleCompanionClick}
                onAnimationEnd={() => setIsPopping(false)}
                className={`companion-button ${isPopping ? 'companion-pop' : ''}`}
                aria-label="Talk to companion"
            >
                <img
                    src={isPopping
                        ? companionPopImages[growthStage]
                        : companionImages[growthStage]}
                    alt={`${growthStage} companion`}
                />
            </button>
            <p>{companionMessage}</p>
            <p>{String(minutes).padStart(2,'0')}:
                {String(remainingSeconds).padStart(2,'0')}
            </p>
            <button onClick={handleTimer}>Button</button>
            <p>Total XP: {totalXP}</p>
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

import { useState } from 'react'
import './Card.css'
import "./EmptyCard.css"
import isCorrectAnswer from '../utils/ai'
import useDeckStore from '../stores/useDeckStore'

export default function Card({ cardData }) {

    const nextCard = useDeckStore(state => state.nextCard)
    const [status, setStatus] = useState(null)
    if (cardData == undefined) {
        return (<main className='review-card'>
            <article className='empty-card card'>
                <h3>No existen cartas en este mazo</h3>
            </article>
        </main>)
    }
    const { back, front } = cardData
    const respond = async (correntAnswer, formData) => {
        const answerText = await isCorrectAnswer(correntAnswer, formData.get("response"))
        const answerJson = JSON.parse(answerText.replace("json", " ").replace(/`/g, ''))
        setStatus(answerJson)
    }
    const handleClick = () => {
        setStatus(null)
        nextCard()
    }
    const isRespondCorrect = respond.bind(null, back)

    const message = status == null ? front : back
    const footer = status == null ?
        (
            <form action={isRespondCorrect}>
                <textarea name="response" rows="5" cols="33" placeholder='Escribe aquí tu respuesta' autoFocus required></textarea>
                <button>
                    Voltear
                </button>
            </form>
        ) : (
            <>
                {status.correct ? <h3 style={{ color: "green" }}>Correcto</h3> : <h3 style={{ color: "red" }}>Incorrecto</h3>}
                {status.correct == false ? <p>{status.why}</p> : null}
                <button onClick={handleClick}>Siguiente</button>

            </>
        )

    return (
        <>
            <article className='empty-card card'>
                <p>{message}</p>
            </article>
            <footer className='card-form'>{footer}</footer>
        </>

    )
}
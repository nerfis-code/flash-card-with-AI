import Card from "../components/Card";
import useDeckStore from "../stores/useDeckStore";
import '../components/Card.css'
import "../components/EmptyCard.css"
export default function ReviewCard() {

    const decks = useDeckStore(state => state.decks)
    const currentDeckIndex = useDeckStore(state => state.currentDeckIndex)
    const cards = decks[currentDeckIndex]?.cards
    const currentCard = useDeckStore(state => state.currentCardIndex)

    return (
        decks.length != 0 ?
            (<main className='review-card'>

                <Card cardData={cards[currentCard]} />
            </main >)
            : (
                <main className='review-card'>
                    <div className="empty-card" > <h1>No existen Mazos para revisar</h1></div>
                </main >
            )
    )
}
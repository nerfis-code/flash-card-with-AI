import useDeckStore from "../stores/useDeckStore"
import "./EmptyCard.css"


export default function EmptyCard() {
    const addCard = useDeckStore(state => state.addCard)
    //const cards = useDeckStore( state => state.deck.cards)
    const addCardToDeck = (formData) => {
        const card = { front: formData.get("front"), back: formData.get("back"), status: "new" }
        addCard(card)
    }
    return (
        <form action={addCardToDeck} className="empty-card">
            <textarea name="front" id="" cols="50" rows="8" placeholder="Escribe aquí el frontal de la carta" required></textarea>
            <textarea name="back" id="" cols="50" rows="8" placeholder="Escribe aquí la parte trasera de la carta" required></textarea>
            <button>Agregar</button>
        </form>
    )
}
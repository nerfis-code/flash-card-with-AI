import EmptyCard from "../components/EmptyCard";
import useDeckStore from "../stores/useDeckStore";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../context/NotificationContext";
import "./EditDeck.css"
import "../components/EmptyCard.css"

export default function EditDeck() {
    // const deck = useDeckStore( store => store.deck)
    const decks = useDeckStore(store => store.decks)
    const currentDeckIndex = useDeckStore(state => state.currentDeckIndex)
    const currentDeck = decks[currentDeckIndex]
    const renameCurrentDeck = useDeckStore(state => state.renameCurrentDeck)
    const deleteCurrentDeck = useDeckStore(state => state.deleteCurrentDeck)
    const selectCurrentDeck = useDeckStore(state => state.selectCurrentDeck)

    const { notify } = useNotificationContext()

    const changeName = (e) => {
        renameCurrentDeck(e.target.value)
    }
    let navigate = useNavigate()
    const handleDeleteBtn = () => {

        notify({ key: currentDeck.id, message: `Se a eliminado el deck ${currentDeck.name}`, props: { "style": { background: "red" } } })
        navigate("/")
        selectCurrentDeck(0)
        deleteCurrentDeck()
    }
    return (
        decks.length != 0 ?
            (<main className="edit-deck">
                <div>
                    <input type="text" name="name" id="" onChange={changeName} defaultValue={currentDeck.name} />
                    <button onClick={handleDeleteBtn}><MiDelete /></button>
                </div>
                <EmptyCard />
            </main>) :
            (<main className="edit-deck">
                <div className="empty-card">
                    <h1>No existe mazos para modificar</h1>
                </div>
            </main>
            )
    )
}

function MiDelete(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1" /></svg>
    )
}
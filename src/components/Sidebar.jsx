import { useNotificationContext } from "../context/NotificationContext";
import useDeckStore from "../stores/useDeckStore"
import "./Sidebar.css"
import { Link } from 'react-router-dom';

export default function AsideBar() {
    const decks = useDeckStore(state => state.decks)
    const selectCurrentDeck = useDeckStore(state => state.selectCurrentDeck)
    const setCurrentCardIndex = useDeckStore(state => state.setCurrentCardIndex)
    const createEmptyDeck = useDeckStore(state => state.createEmptyDeck)
    const selectDeck = (index) => () => { setCurrentCardIndex(0); selectCurrentDeck(index) }
    const { notify } = useNotificationContext()
    const navs = decks.map((deck, index) => (
        <nav key={deck.id} onClick={selectDeck(index)} className="sidebar-nav">
            <Link to={"reviewcard"}>{deck.name}</Link>
            <Link to={"edit"}><BxsEdit /></Link>
        </nav>
    ))
    const addNewDeck = () => {
        ;
        createEmptyDeck()
        notify({ key: decks.length, message: "se a agregado un nuevo mazo vacio!", props: { style: { "background": "green" } } })
        console.log(decks.length)
    }
    return (
        <aside>
            <div className="sidebar">
                {navs}
                <button onClick={addNewDeck}>Agregar Mazo</button>
            </div>
        </aside>
    )
}
// <Link to={"edit"}><MaterialSymbolsDelete/></Link>
export function MaterialSymbolsDelete(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" /></svg>
    )
}

export function BxsEdit(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z" /><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z" /></svg>
    )
}
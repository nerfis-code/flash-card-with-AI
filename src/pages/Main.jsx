import useDeckStore from "./../stores/useDeckStore"
import AsideBar from "../components/Sidebar"

export default function Main() {
    const decks = useDeckStore(state => state.decks)

    return (
        <div className="main-body">
            <main>
                <h1>Flash card paco</h1>
                <h2>Prueba oculta</h2>
            </main>
            <AsideBar />
        </div>
    )
}


import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


const useDeckStore = create(
  persist(
    (set, get) => ({
      decks: [],
      currentDeckIndex: 0,
      currentCardIndex: 0,
      selectCurrentDeck: (index) => set(() => ({ currentDeckIndex: index })),
      setCurrentCardIndex: (index) => set(() => ({ currentCardIndex: index })),
      addCard: (card) => set((state) => {
        const newDecks = state.decks
        newDecks[state.currentDeckIndex].cards.push(card)
        return { decks: newDecks }
      }),
      createEmptyDeck: () => set((state) => ({ decks: [...state.decks, { name: "unamed", id: crypto.randomUUID(), cards: [] }] })),
      deleteCurrentDeck: () => set((state) => ({ decks: state.decks.filter((_, deckIndex) => state.currentDeckIndex != deckIndex) })),
      renameCurrentDeck: (newName) => set((state) => {
        const newDecks = state.decks
        newDecks[state.currentDeckIndex].name = newName
        return { decks: newDecks }
      }),
      nextCard: () => set(({ decks, currentDeckIndex, currentCardIndex }) =>
        ({ currentCardIndex: currentCardIndex < decks[currentDeckIndex].cards.length - 1 ? currentCardIndex + 1 : 0 })),
      // prevCard: () => set((state) => ({ currentCardIndex : state.currentCardIndex != 0 ? state.currentCard -1 : state.deck.cards.length -1}))
    })
  )
)

const DEFAULT_DECK = [
  { front: "", back: "", status: "", lastRevision: "", nextRevision: "" }

]
export default useDeckStore
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Children, createContext, useContext, useState } from "react";
import useDeckStore from './stores/useDeckStore';
import ReviewCard from './pages/ReviewCard';
import Main from './pages/Main';
import EditDeck from './pages/EditDeck';
import NotFound from './pages/NotFound';
import './App.css'
import { NotificationContext } from './context/NotificationContext';

function App() {
  const [notification, setNotification] = useState(<span className='notification' style={{ background: "red" }}>asdfadsfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfadsfasdfasdfasdfs</span>)
  const notify = ({ key, message, props }) => {
    setNotification(<span className='notification' key={key} {...props} >{message}</span>)
  }

  const currentDeckIndex = useDeckStore(state => state.currentDeckIndex)
  const currentDeckName = useDeckStore(state => state.decks[currentDeckIndex]?.name)

  return (
    <>
      <Router>
        <nav className='main-nav'>
          <div>
            <Link to={"/"}><CarbonHome /></Link>
            <Link to={"/reviewcard"}><PajamasReviewList /></Link>
            <Link to={"/edit"}><BxEdit /></Link>
          </div>
          {currentDeckName ? <span className='deck-name'>{currentDeckName}</span> : <span className='deck-name'>No existen mazos!</span>}
          {notification}
        </nav>
        <Routes>
          <Route path="/" element={<NotificationContext.Provider value={{ notify }}><Main /></NotificationContext.Provider>} />
          <Route path="/reviewcard" element={<NotificationContext.Provider value={{ notify }}><ReviewCard /></NotificationContext.Provider>} />
          <Route path="/edit" element={<NotificationContext.Provider value={{ notify }}><EditDeck /></NotificationContext.Provider>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router >
    </>
  )
}

function CarbonHome(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...props}><path fill="currentColor" d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15L31 13.428ZM18 26h-4v-8h4Zm2 0v-8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v8H6V12.062l10-7.79l10 7.8V26Z" /></svg>
  )
}
function PajamasReviewList(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}><path fill="currentColor" fill-rule="evenodd" d="M9 2.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m1.45-.5a2.5 2.5 0 0 0-4.9 0H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM8 5H5.5V3.5h-2v11h9v-11h-2V5zM5 7.75A.75.75 0 0 1 5.75 7h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 7.75m.75 1.75a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5z" clip-rule="evenodd" /></svg>
  )
}
function BxEdit(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z" /><path fill="currentColor" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2" /></svg>
  )
}
export default App

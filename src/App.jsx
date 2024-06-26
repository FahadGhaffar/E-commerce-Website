import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter } from 'react-router-dom'
import AppHeader from "./containers/Header/Header"
import AppFooter from './containers/Footer/Footer'
import AppContent from './containers/PageContent/PageContent'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
    <BrowserRouter>
        <AppHeader/>
    <AppContent/>
    <AppFooter/>
    </BrowserRouter>
      
    </div>
  )
}



export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AppHeader from "./containers/Header"
import AppFooter from './containers/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppHeader/>
    <AppFooter/>
      
    </>
  )
}

export default App

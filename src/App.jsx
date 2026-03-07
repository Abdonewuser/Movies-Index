import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      {/* Rest of the app will go here */}
    </>
  )
}

export default App

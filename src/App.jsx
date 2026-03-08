import { useState } from 'react'
import Layout from './components/Layout'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Movie from './Pages/Movie'
function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Homepage />
        },
        {
          path: "/movie",
          element: <Movie />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

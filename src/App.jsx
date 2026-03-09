import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './Pages/Homepage'
import Movie from './Pages/Movie'
import Category from './Pages/Category'

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
          path: "/category/:categoryId",
          element: <Category />
        },
        {
          path: "/movie/:movieId",
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

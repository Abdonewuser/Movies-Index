import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './Pages/Homepage'
import Movie from './Pages/Movie'
import Category from './Pages/Category'
import Result from './Pages/Result'

function App() {
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
        },
        {
          path: "/result/:searchQuery",
          element: <Result />
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

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ChatScreen } from './screens/chat'
import { HomeScreen } from './screens/home'
import { RoomsScreen } from './screens/rooms'

import './styles/global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/rooms',
    element: <RoomsScreen />,
  },
  {
    path: '/rooms/:room_id',
    element: <ChatScreen />,
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

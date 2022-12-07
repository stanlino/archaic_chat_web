import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUserAlt } from 'react-icons/fa'

import { Room } from "../../../dtos/room"
import { Loading } from "./loading"

export function Rooms() {
  
  const [isLoading, setLoading] = useState(true)
  const [activesRooms, setActivesRooms] = useState<Room[]>([] as Room[])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://archaicchatserver-production.up.railway.app/rooms')
      .then(response => response.json())
      .then(data => {
        setActivesRooms(data)
      })
      .finally(() => {
        setLoading(false)
      })
  },[])

  function handleNavigateToRoom(roomId: string) {
    navigate(`/rooms/${roomId}`)
  }

  if (isLoading) return <Loading />

  if (activesRooms.length === 0) return (
    <p className="text-neutral-400 text-xl">Não há salas criadas 🙁</p>
  )

  return (
    <div className="flex w-full max-w-md flex-col justify-center items-center gap-4">
      <div className="flex justify-between w-full px-4">
        <span className="text-neutral-400 text-lg">Salas ativas</span>
        <span className="text-orange-500 text-lg">{activesRooms.length}</span>
      </div>
      <div className="flex flex-col gap-2 justify-between w-full">
        {activesRooms.map(room => (
          <button onClick={() => handleNavigateToRoom(room.id)} className="flex justify-between items-center w-full p-4 rounded hover:bg-black hover:bg-opacity-10 border border-transparent hover:border-gray-600">
            <span className="text-neutral-50 text-lg font-bold"># {room.id}</span>
            <span className="text-green-200 flex text-lg items-center gap-1">
              {room.users.length} <FaUserAlt className="text-sm" />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
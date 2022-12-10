import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rooms } from "./components/rooms";

export function RoomsScreen() {

  const navigate = useNavigate()

  const [roomName, setRoomName] = useState('')

  function handleCreateRoom(event: React.FormEvent) {

    event.preventDefault()

    navigate(`/rooms/${roomName.toLowerCase()}`)
  }

  function updateRoomName(event: React.ChangeEvent<HTMLInputElement>) {
    setRoomName(event.target.value)
  }

  return (
    <main className="min-h-screen w-screen bg-gradient-to-tl from-neutral-900 to-gray-900 flex flex-col md:flex-row gap-12 md:gap-0 py-12 justify-between">
      <div className="flex flex-col flex-1 justify-center items-center">
        <Rooms />
      </div>
      <form onSubmit={handleCreateRoom} className="flex flex-1 justify-center items-center px-4">
        <div className="flex flex-1 flex-col items-center gap-4 justify-center max-w-md">
          <h2 className="text-2xl text-slate-100 text-left w-full">Crie uma sala</h2>
          <input required value={roomName} onChange={updateRoomName} placeholder="código da sala" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4 lowercase" />
          <button type="submit" disabled={roomName.length < 1} className="w-full h-10 rounded text-slate-100 px-4 font-bold bg-blue-700 hover:bg-blue-800 disabled:bg-neutral-600 transition-all">
            Criar sala
          </button>
        </div>
      </form>
    </main>
  )
}
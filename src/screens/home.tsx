import { FormEvent, useEffect, useRef, useState } from "react"
import { useUserStore } from "../store/user"

import { useNavigate } from 'react-router-dom'
import { HexColorPicker } from "react-colorful"
import { Room } from "../dtos/room"

function HomeScreen() {

  const { username, setUsername, color, setColor } = useUserStore(store => ({
    username: store.username,
    setUsername: store.setUsername,
    color: store.color,
    setColor: store.setColor,
  }))

  const [loading, setLoading] = useState(true)
  const [activesRooms, setActivesRooms] = useState<Room[]>([] as Room[])

  const navigate = useNavigate()

  const room_id_input = useRef<HTMLInputElement>(null)
  const username_input = useRef<HTMLInputElement>(null)

  function handleSignIn(event: FormEvent) {
    event.preventDefault()
    
    const room_id_value = room_id_input.current?.value
    const username_value = username_input.current?.value

    if (!room_id_value || !username_value) return

    setUsername(username_input.current.value)

    return navigate(`/room/${room_id_value.toLowerCase()}`)
  }

  function handleSelectRoom(room_id: string) {
    room_id_input.current?.setAttribute('value', room_id)
    room_id_input.current?.focus()
  }

  useEffect(() => {
    fetch('https://uniquechatserver.herokuapp.com/rooms')
      .then(response => response.json())
      .then(data => {
        setActivesRooms(data)
        setLoading(false)
      })
  },[])
  
  return (
    <main className="min-h-screen w-screen bg-neutral-900 flex flex-col md:flex-row gap-12 md:gap-0 py-12 justify-between">
      <div className="flex flex-col flex-1 justify-center items-center gap-16">
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/favicon.png" alt="Computador estilo steampunk" className="w-32" />
          <h1 className="text-2xl text-neutral-400">Seja bem vind@</h1>
          <h1 className="text-4xl text-orange-500 font-bold">Archaic chat</h1>
        </div>
        <div className="flex w-full max-w-md flex-col justify-center items-center gap-4">
          {loading ? (
            <div className="flex flex-row justify-center items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <h1 className="text-base text-neutral-400 ml-4">Buscando por salas ativas...</h1>
            </div>
          ) : (
            <>
              <div className="flex justify-between w-full px-4">
                <span className="text-neutral-400 text-lg">Salas ativas</span>
                <span className="text-orange-500 text-lg">{activesRooms.length}</span>
              </div>
              <div className="flex flex-col gap-2 justify-between w-full">
                {activesRooms.map(room => (
                  <button onClick={() => handleSelectRoom(room.id)} className="flex justify-between items-center w-full hover:bg-neutral-800 p-4 rounded">
                    <span className="text-neutral-50 text-lg"># {room.id}</span>
                    <span className="text-green-200">{room.users.length} usuários online</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>  
      <div className="flex flex-1 justify-center items-center px-4">
        <form onSubmit={handleSignIn} className="flex flex-1 flex-col items-center gap-4 justify-center max-w-md">
          <HexColorPicker color={color} onChange={setColor} className="mb-4" />
          <input ref={room_id_input} placeholder="Código da sala" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4 lowercase" />
          <input defaultValue={username} ref={username_input} placeholder="Username" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4" />
          <button type="submit" className="w-full bg-neutral-600 h-10 rounded text-slate-100 px-4 hover:bg-neutral-500 font-bold">Entrar na sala</button>
        </form>
      </div>
    </main>
  )
}

export { HomeScreen }
import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/user"
import { UpdateProfile } from "./components/updateProfile"

function HomeScreen() {  

  const hasUsername = useUserStore(state => state.username)

  const navigate = useNavigate()

  function navigateToRooms(event: FormEvent) {
    event.preventDefault()

    navigate('/rooms')
  }

  return (
    <main className="min-h-screen w-screen bg-gradient-to-tl from-neutral-900 to-gray-900 flex flex-col md:flex-row gap-12 md:gap-0 py-12 justify-between">
      <div className="flex flex-col flex-1 justify-center items-center gap-16">
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/favicon.png" alt="Computador estilo steampunk" className="w-40" />
          <h1 className="text-2xl text-neutral-400">Seja bem vind@</h1>
          <h1 className="text-4xl text-orange-500 font-bold">Archaic chat</h1>
        </div>
      </div>  
      <form onSubmit={navigateToRooms} className="flex flex-1 justify-center items-center px-4">
        <div className="flex flex-1 flex-col items-center gap-4 justify-center max-w-md">
          <UpdateProfile />
          <button type="submit" disabled={!hasUsername} className="w-full h-10 rounded text-slate-100 px-4 font-bold bg-blue-700 hover:bg-blue-800 disabled:bg-neutral-600 transition-all">
            Procurar salas
          </button>
        </div>
      </form>
    </main>
  )
}

export { HomeScreen }
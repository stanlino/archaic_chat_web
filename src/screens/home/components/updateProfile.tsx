import React from "react"
import { HexColorPicker } from "react-colorful"

import { useUserStore } from "../../../store/user"

export function UpdateProfile() {

  const { username, setUsername, color, setColor } = useUserStore(store => store)

  function updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  return (
    <React.Fragment>
      <h2 className="text-xl text-slate-100 text-left w-full font-bold">
        Atualize seu perfil
      </h2>

      <HexColorPicker style={{ width: '100%' }} color={color} onChange={setColor} />

      <input required value={username} onChange={updateUsername} placeholder="Escreva seu nome" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4" />
    </React.Fragment>
  )
}
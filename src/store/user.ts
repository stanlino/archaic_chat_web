import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserState {
  username: string
  setUsername: (username: string) => void
  color: string
  setColor: (color: string) => void
}

let hex = window.crypto.getRandomValues(new Uint8Array(3))
  .reduce((acc, val) => acc + val.toString(16), "#");

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        username: null as unknown as string,
        setUsername: (username: string) => set({ username }),
        color: hex,
        setColor: (color: string) => set({ color }),
      }),
      {
        name: '@archaic/user_storage'
      }
    )
  )
)

export { useUserStore }
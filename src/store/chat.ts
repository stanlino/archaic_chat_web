import create from 'zustand'

interface ChatState {
  room_id: string
  setRoomId: (room_id: string) => void
  username: string
  setUsername: (username: string) => void
}


const useChatStore = create<ChatState>((set) => ({
  room_id: '',
  setRoomId: (room_id: string) => set({ room_id }),
  username: '',
  setUsername: (username: string) => set({ username }),
}))

export { useChatStore }
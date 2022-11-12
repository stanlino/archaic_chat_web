import create from 'zustand'
import { Message } from '../dtos/message'

interface MessagesStore {
  messages: Message[]
  addMessage: (message: Message) => void
  clearMessages: () => void
}

const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  addMessage: (message: Message) => set(state => ({ messages: [...state.messages, message] })),
  clearMessages: () => set(state => ({ messages: [] }))
}))

export { useMessagesStore }
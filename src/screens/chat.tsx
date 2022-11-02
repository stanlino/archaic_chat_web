import { FormEvent, useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client";
import { useChatStore } from "../store/chat";

function ChatScreen() {

  const [username, room_id] = useChatStore(state => [state.username, state.room_id]);
 
  const [messages, setMessages] = useState([] as any[]);	

  const socket = useRef<Socket>();

  useEffect(() => {

    socket.current = io('http://localhost:3000', { transports: ['websocket'] });

    socket.current?.on('connect', () => {
      console.log('connected to server')

      socket.current?.emit('join-room', room_id);
    })

    socket.current?.on('message-to-app', (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });
  }, []);

  const new_message_input_ref = useRef<HTMLInputElement>(null)

  function handleSendANewMessage(event: FormEvent) {
    event.preventDefault()

    if (!new_message_input_ref.current) return
    if (!new_message_input_ref.current.value) return

    socket.current?.emit('message-to-server', {
      message: new_message_input_ref.current.value,
      username,
      room_id,
      message_id: Math.random().toString(36).substr(2, 9)
    })

    new_message_input_ref.current.value = ''
  }

  return (
    <main className="h-screen w-screen bg-neutral-900 flex flex-col justify-center items-center p-4 md:p-16">
      <div className="flex-1 flex flex-col w-full">
        {messages.map((message, index) => (
          <div key={index} className="flex mb-4" title={message.message_id}>
            <span className="text-neutral-300 font-bold">{message.username}:</span>
            <span className="text-neutral-100 ml-2">{message.message}</span>
          </div> 
        ))}
      </div>
      <form onSubmit={handleSendANewMessage} className='flex w-full gap-2'>
        <input ref={new_message_input_ref} placeholder="Escreva uma mensagem" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4" />
        <button type="submit" className="w-1/6 bg-neutral-600 h-10 rounded text-slate-100 px-4 hover:bg-neutral-500 font-bold">Enviar</button>
      </form>
    </main>
  )
}

export { ChatScreen }
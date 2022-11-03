import { FormEvent, useRef } from "react"
import { useSocket } from "../hooks/useSocket";
import { useChatStore } from "../store/chat";

function ChatScreen() {

  const [ username, room_id ] = useChatStore(state => [state.username, state.room_id]);
 
  const new_message_input_ref = useRef<HTMLInputElement>(null)

  const { connected, messages, sendMessage } = useSocket('https://uniquechatserver.herokuapp.com/', {
    username,
    room_id
  })

  function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    const message = new_message_input_ref.current?.value
    if (!message) return

    sendMessage(message)
    new_message_input_ref.current.value = ''
  }

  const reversed_messages = messages.slice().reverse()

  return (
    <main className="h-screen w-screen bg-neutral-900 flex flex-col justify-center items-center p-4 md:p-16">
      <div className="flex-1 w-full overflow-hidden py-4">
        <div className="flex-1 flex flex-col-reverse overflow-y-auto h-full">
          {reversed_messages.map((message, index) => (
            <div key={index} className="flex mb-4" title={message.message_id}>
              <span className="text-neutral-300 font-bold">{message.username}:</span>
              <span className="text-neutral-100 ml-2">{message.message}</span>
            </div> 
          ))}
          <span className="text-gray-500 my-4">{connected ? 'Conectado ao chat': 'Se conectando ao chat ...'}</span>
        </div>
      </div>
      <form onSubmit={handleSendMessage} className='flex w-full gap-2'>
        <input ref={new_message_input_ref} placeholder="Escreva uma mensagem" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4" />
        <button type="submit" className="w-1/6 bg-neutral-600 h-10 rounded text-slate-100 px-4 hover:bg-neutral-500 font-bold">Enviar</button>
      </form>
    </main>
  )
}

export { ChatScreen }